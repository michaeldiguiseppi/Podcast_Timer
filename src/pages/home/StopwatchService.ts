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
        this.startAt = 0;
        this.startAt += 1;
    }

    update() {
      return this.startAt += 1;
    }

    time() {
        return this.startAt;
    }
}
