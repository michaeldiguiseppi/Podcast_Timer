import { Injectable } from '@angular/core';
import { Observable, Subscription, Observer } from 'rxjs/Rx';

interface Interval {
  start: number;
  stop?: number;
}

@Injectable()
export class StopwatchService {

  timer: Observable<number>;
  intervals: Interval[] = [];

  private emitter: Observer<number>;
  private paused = null;
  private updateSubscription: Subscription;

  constructor() {
    this.timer = Observable.create(e => this.emitter = e);
  }

  startObservable() {
    this.updateSubscription = Observable.interval(10).subscribe(this.updateTime.bind(this));
  }

  stopObservable() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  start() {
    this.reset();
    this.paused = false;
    this.intervals.push({
      start: Date.now(),
    });
    this.startObservable();
  }

  reset() {
    this.paused = null;
    this.emitter.next(0);
    this.intervals = [];
    this.stopObservable();
  }

  pauseAndResume() {
    if (this.intervals[this.intervals.length - 1].stop) {
      this.startNewInterval();
      this.paused = false;
      this.startObservable();
    } else {
      this.intervals[this.intervals.length - 1].stop = Date.now();
      this.paused = true;
      this.stopObservable();
    }
  }

  getIntervalTime(interval: Interval) {
    const stopTime = interval.stop ? interval.stop : Date.now();
    return stopTime - interval.start;
  }

  private startNewInterval() {
    this.intervals.push({
      start: Date.now(),
    });
  }

  private updateTime() {
    this.emitter.next(this.intervals.reduce((total, interval: Interval) => {
      const stopTime = interval.stop ? interval.stop : Date.now();
      total += this.getIntervalTime(interval);
      return total;
    }, 0));
  }
}
