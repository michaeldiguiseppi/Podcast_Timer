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
      this.startAt = this.startAt
          ? this.startAt
          : this._now();
    }

    update() {
      return this._now() - this.startAt;
    }

    time() {
        return this.startAt;
    }

    _now() {
      return new Date().getTime();
    }
}
