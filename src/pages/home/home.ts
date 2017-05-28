import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StopwatchService } from './StopwatchService';

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
  timer: any;

  constructor(public navCtrl: NavController, stopwatchService: StopwatchService) {
    this.stopwatchService = stopwatchService;
    this.time = 0;
    this.started = false;
  }

  getUpdate() {
      let self = this;

      return () => {
          self.time = this.stopwatchService.update();
      };
  }

  startStopwatch() {
    this.timer = setInterval(this.getUpdate(), 1);
    this.stopwatchService.start();
  }

  stopStopwatch() {
    clearInterval(this.timer);
  }

  resetStopwatch() {
      this.stopwatchService.reset();
      this.time = 0;
      this.started = false;
  }

  formatTime(timeMs: number) {
      let minutes: string,
          seconds: string;


      minutes = Math.floor(timeMs / 60000).toString();
      seconds = ((timeMs % 60000) / 1000).toFixed(3);
      return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
  }

  populateText(time: number, button: string) {
    this.time = time;
    this.button = button;
    if (this.timeLog === '') {
      this.timeLog += this.time + " : " + this.button;
    } else {
      this.timeLog += "\n" + this.time + " : " + this.button;
    }
  }
}
