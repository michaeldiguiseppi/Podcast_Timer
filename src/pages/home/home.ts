import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { StopwatchService } from './StopwatchService';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  timeLog: string = '';
  time: number;
  started: boolean;
  button: string = '';
  stopwatchService: StopwatchService;
  smartAudioProvider: SmartAudioProvider;
  alertController: AlertController;
  timer: any;
  values: string[];

  constructor(public navCtrl: NavController, alertController: AlertController, platform: Platform, stopwatchService: StopwatchService, smartAudioProvider: SmartAudioProvider) {
    this.stopwatchService = stopwatchService;
    this.smartAudioProvider = smartAudioProvider;
    this.alertController = alertController;
    this.time = 0;
    this.started = false;
    this.values = ["button 1", "button 2", "button 3", "cough", "bumped mic", "bg noise"];
    platform.ready().then(() => {
      smartAudioProvider.preload('buttonClick', 'assets/audio/beep.mp3')
    });
  }

  getUpdate() {
      let self = this;

      return () => {
          self.time = this.stopwatchService.update();
      };
  }

  startStopwatch() {
    this.timer = setInterval(this.getUpdate(), 10);
    this.started = true;
    this.stopwatchService.start();
  }

  stopStopwatch() {
    this.started = false;
    clearInterval(this.timer);
  }

  resetStopwatch() {
    if (this.started) {
      this.stopStopwatch();
    }
    this.stopwatchService.reset();
    this.time = 0;
    this.started = false;
  }

  formatTime(timeMs: number) {
      let minutes: string,
          seconds: string;


      minutes = Math.floor(timeMs / 1000 / 60).toString();
      seconds = ((timeMs / 1000) % 60).toFixed(3);
      return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
  }

  buttonClick() {
    this.smartAudioProvider.play('buttonClick');
  }


  populateText(time: number, button: string) {
    this.buttonClick();
    this.time = time;
    this.button = button;
    if (this.timeLog === '') {
      this.timeLog += this.formatTime(this.time) + " : " + this.button;
    } else {
      this.timeLog += "\n" + this.formatTime(this.time) + " : " + this.button;
    }
  }

  clearText() {
    let alert = this.alertController.create({
    title: 'Confirm clear text',
    message: 'Are you sure you want to clear the time log?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log("clicked cancel");
        }
      },
      {
        text: 'Clear',
        handler: () => {
          this.timeLog = '';
        }
      }
    ]
  });
  alert.present();
  }
}
