import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ScoreData, MathExpression, Visited} from '../modules/iface.module';
import { getRandom } from '../modules/math.module';
import {mkMathExp} from '../modules/string.module';
import {TimerTaskService} from '../services/timer-task.service';
import {ApiServices} from '../services/api.services';
import {first} from 'rxjs/operators';
import {AppFacade} from '../app.facade';

@Component({
  selector: 'app-groupz',
  templateUrl: './groupz.component.html',
  styleUrls: ['./groupz.component.css'],
})
export class GroupzComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('answerText', {static: false}) ansTxt: ElementRef;

  inputDisabled = false;
  scoreGroupZData: ScoreData;
  currentTask: MathExpression;

  isAnswerRight = false;
  res = 0;
  answerRecense = '';
  tempStr = '';
  valueAnswerText = '';
  t: Visited = new Visited();

  constructor(public timeTask: TimerTaskService, private api: ApiServices, private appFacade: AppFacade) {
  }

  ngOnInit(): void {
    this.appFacade.setIsTaskPage(true);
    this.appFacade.mkHeadersView('groupz');

    this.scoreGroupZData = {
      totalProblems: 50,
      givenProblems: 0,
      solvedProblems: 0
    };
    this.currentTask = {
      leftExp: 0,
      rightExp: 0,
      operation: '+'
    };
    this.setTask();
    this.timeTask.initTimer(15);
    this.api.getVisited('groupz')
      .pipe(first())
      .subscribe((visited: Visited) => {
      this.t = visited;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ansTxt.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
    this.timeTask.stopTimer();
  }

  setTask() {
    if (getRandom(0, 19) % 2 === 0) {
      this.currentTask.leftExp = getRandom(1, 50);
    } else {
      this.currentTask.leftExp = getRandom( -50, -1);
    }
    if (getRandom(0, 19) % 2 === 0) {
      this.currentTask.rightExp = getRandom(1, 50);
    } else {
      this.currentTask.rightExp = getRandom(-50, -1);
    }
    if (getRandom(0, 19) % 2 === 0) {
      this.currentTask.operation = '+';
    } else {
      this.currentTask.operation = '-';
    }
    this.appFacade.setProblemText(mkMathExp(this.currentTask));
  }

  checkAnswer(event: KeyboardEvent) {
    this.tempStr = (event.target as HTMLInputElement).value;
    // this.res = (this.currentTask.operation === '-') ? +this.currentTask.leftExp -
    //                       (+this.currentTask.rightExp) : +this.currentTask.leftExp +
    //                       (+this.currentTask.rightExp);
    // Здесь как нельзя лучше походит eval().
    // tslint:disable-next-line:no-eval
    this.res = eval (this.appFacade.getProblemText());
    this.isAnswerRight = this.res === +this.tempStr;
    if (this.isAnswerRight) {
      this.scoreGroupZData.solvedProblems += 1;
      this.answerRecense = 'Правильно';
      if (this.scoreGroupZData.givenProblems < this.scoreGroupZData.totalProblems - 1) {
        this.setTask();
      }
    } else {
      this.answerRecense = 'Неправильно';
    }
    this.valueAnswerText = null;
    this.scoreGroupZData.givenProblems += 1;
    if ( this.scoreGroupZData.givenProblems >= this.scoreGroupZData.totalProblems) {
      this.answerRecense = 'Тренировка закончена!';
      this.appFacade.setInputDisabled(true);
      this.timeTask.stopTimer();
    }
  }

  onInpDis(inputDisabled: boolean) {
    this.inputDisabled = inputDisabled;
  }
}
