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
  button: string = '';
  started: boolean;
  stopwatchService: StopwatchService;
  smartAudioProvider: SmartAudioProvider;
  alertController: AlertController;
  values: string[];
  color: string;

  constructor(public navCtrl: NavController, alertController: AlertController, platform: Platform, stopwatchService: StopwatchService, smartAudioProvider: SmartAudioProvider) {
    this.stopwatchService = stopwatchService;
    this.smartAudioProvider = smartAudioProvider;
    this.alertController = alertController;
    this.time = 0;
    this.started = false;
    this.color = "danger";
    this.values = ["Edit", "Cut", "Noise", "Highlight", "Course Walk", "Looking Ahead", "Mental", "Game Plan", "Setup", "Tip"];
    platform.ready().then(() => {
      smartAudioProvider.preload('buttonClick', 'assets/audio/beep.mp3')
    });
    this.stopwatchService.timer.subscribe(totalTime => this.time = totalTime);
  }

  startStopwatch() {
    this.started = true;
    this.stopwatchService.start()
  }

  stopResumeStopwatch() {
    this.started = !this.started;
    if (this.started) {
      this.color = "danger";
    } else {
      this.color = "secondary";
    }
    this.stopwatchService.pauseAndResume();
  }

  resetStopwatch() {
    let alert = this.alertController.create({
      title: 'Reset Timer',
      message: 'Are you sure you want to reset the timer?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Reset',
          handler: () => {
            this.started = false;
            this.color = "danger";
            this.stopwatchService.reset();
          }
        }
      ]
    });
    alert.present();
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
