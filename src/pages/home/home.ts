import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { StopwatchService } from './StopwatchService';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { Storage } from '@ionic/storage';
import { SettingsPage } from '../settings/settings';

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
  storage: Storage;

  constructor(public navCtrl: NavController, alertController: AlertController, platform: Platform, stopwatchService: StopwatchService, smartAudioProvider: SmartAudioProvider, storage: Storage) {
    this.stopwatchService = stopwatchService;
    this.smartAudioProvider = smartAudioProvider;
    this.alertController = alertController;
    this.storage = storage;
    this.time = 0;
    this.storage.get('started').then((val) => {
      if (val == null) {
        this.started = false;
      } else {
        this.started = val;
      }
    })
    this.storage.set('started', this.started);
    this.color = "danger";
    this.storage.get('buttonGrid').then((val) => {
      if (val == null) {
        navCtrl.setRoot(SettingsPage);
      }
      this.values = Object.keys(val).map((key) => { return val[key] }) || ["Edit", "Cut", "Noise", "Highlight", "Course Walk", "Looking Ahead", "Mental", "Game Plan", "Setup", "Tip"];
    });
    this.storage.get('timeLog').then((val) => {
      if (val == null) {
        this.timeLog = '';
      } else {
        this.timeLog = val;
      }
    });
    platform.ready().then(() => {
      smartAudioProvider.preload('beep1', 'assets/audio/beep1.mp3');
      smartAudioProvider.preload('beep2', 'assets/audio/beep2.mp3');
      smartAudioProvider.preload('beep3', 'assets/audio/beep3.mp3');
      smartAudioProvider.preload('beep4', 'assets/audio/beep4.mp3');
      smartAudioProvider.preload('beep5', 'assets/audio/beep5.mp3');
      smartAudioProvider.preload('beep6', 'assets/audio/beep6.mp3');
      smartAudioProvider.preload('beep7', 'assets/audio/beep7.mp3');
      smartAudioProvider.preload('beep8', 'assets/audio/beep8.mp3');
      smartAudioProvider.preload('beep9', 'assets/audio/beep9.mp3');
      smartAudioProvider.preload('beep10', 'assets/audio/beep10.mp3');
    });
    this.stopwatchService.timer.subscribe(totalTime => this.time = totalTime);
  }

  startStopwatch() {
    this.started = true;
    this.storage.set('started', this.started);
    this.stopwatchService.start()
  }

  stopResumeStopwatch() {
    this.storage.get('started').then((val) => {
      this.started = val;
    });
    if (this.started) {
      this.color = "danger";
    } else {
      this.color = "secondary";
    }
    this.started = !this.started;
    this.storage.set('started', this.started);
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
            this.storage.set('started', this.started);
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

  buttonClick(buttonNum) {
    switch(buttonNum) {
      case 1:
        this.smartAudioProvider.play('beep1');
        break;
      case 2:
        this.smartAudioProvider.play('beep2');
        break;
      case 3:
        this.smartAudioProvider.play('beep3');
        break;
      case 4:
        this.smartAudioProvider.play('beep4');
        break;
      case 5:
        this.smartAudioProvider.play('beep5');
        break;
      case 6:
        this.smartAudioProvider.play('beep6');
        break;
      case 7:
        this.smartAudioProvider.play('beep7');
        break;
      case 8:
        this.smartAudioProvider.play('beep8');
        break;
      case 9:
        this.smartAudioProvider.play('beep9');
        break;
      case 10:
        this.smartAudioProvider.play('beep10');
        break;
      default:
        break;
    }
  }


  populateText(time: number, button: string, buttonNum: number,) {
    this.buttonClick(buttonNum + 1);
    this.time = time;
    this.button = button;
    if (this.timeLog === '') {
      this.timeLog += this.formatTime(this.time) + " : " + this.button;
    } else {
      this.timeLog += "\n" + this.formatTime(this.time) + " : " + this.button;
    }
    this.storage.set('timeLog', this.timeLog);
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
          this.storage.set('timeLog', "");
          this.timeLog = '';
        }
      }
    ]
  });
  alert.present();
  }
}
