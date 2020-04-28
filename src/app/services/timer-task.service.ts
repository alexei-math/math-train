import {Injectable} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {mkTimeString} from '../modules/string.module';

@Injectable()
export class TimerTaskService {
  inpStream$: Observable<number>;
  sub: Subscription;
  timeStr = '00:00';
  timeToTest = 10;
  inputDisabled = false;
  complete = '';

  constructor() {
    this.inpStream$ = interval(1000);
  }

  initTimer( minutes: number) {
    this.timeToTest = minutes;
    this.inputDisabled = false;
    this.complete = '';
    this.sub = this.inpStream$.subscribe((value) => {
      this.timeStr = mkTimeString(value);
      if (value >= this.timeToTest * 60) {
        this.sub.unsubscribe();
        this.complete = 'Время на выполнение теста истекло!';
        this.inputDisabled = true;
      }
    });
  }

  stopTimer() {
    this.sub.unsubscribe();
  }
}
