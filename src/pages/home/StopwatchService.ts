import { Injectable } from '@angular/core';


@Injectable()
export class StopwatchService {

    private startAt: number;

    constructor() {
        this.reset();
    }


    reset() {
        this.startAt = 0;
        return this.startAt;
    }

    start() {
      if (this.startAt) {
        console.warn("Already have startAt")
        this.startAt = this.startAt - (this.startAt - this._now())
        console.warn(this.startAt);
        debugger;
      } else {
        console.warn("No startAt")
        this.startAt;
        console.warn(this.startAt);
        debugger;
      }
      // this.startAt = this.startAt
      //     ?
      //     :
    }

    pause() {
      this.startAt = this._now();
      console.warn(this.startAt);
    }

    resume() {
      this.start();
    }

    update() {
      console.warn(this.startAt);
      console.warn(this._now());
      return this._now() - this.startAt;
    }

    time() {
        return this.startAt;
    }

    _now() {
      return new Date().getTime();
    }
}
