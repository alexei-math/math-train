import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ScoreData, SimpleTask, Visited} from '../modules/iface.module';
import {TimerTaskService} from '../services/timer-task.service';
import {ApiServices} from '../services/api.services';
import {Subscription} from 'rxjs';
import {AppFacade} from '../app.facade';
import {first} from 'rxjs/operators';
import {HeapMax} from '../lib/heap.lib';
import {getRandom} from '../modules/math.module';

@Component({
  selector: 'app-multtab',
  templateUrl: './multtab.component.html',
  styleUrls: ['./multtab.component.css']
})
export class MulttabComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('inputAns', {static: false}) inpAns: ElementRef;

  inputDisabled = false;
  scoreMultiData: ScoreData;
  ans = '';
  ansHints = {res: '', complete: ''};
  subs: Subscription;
  t: Visited = new Visited();
  currentTask: SimpleTask = new SimpleTask();
  heap: HeapMax = new HeapMax();
  lastTask = [0, 0];
  isErrors = false;

  constructor(
    public timeTask: TimerTaskService,
    private api: ApiServices,
    private appFacade: AppFacade
  ) {}

  ngOnInit(): void {

    this.appFacade.mkHeadersView('multtab');


    this.scoreMultiData = {
      totalProblems: 50,
      givenProblems: 0,
      solvedProblems: 0
    };

    this.setTask();
    this.timeTask.initTimer(10);
    this.subs = this.api.getVisited('multtab')
      .pipe(first())
      .subscribe( (visited: Visited) => {
    this.t = visited;
    });

    for (let i = 0; i < 10; i++) {
      this.heap.insert({value: i, prior: 0, pos: 0});
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.appFacade.setIsTaskPage(true);
    });
  }

  ngOnDestroy(): void {
    this.timeTask.stopTimer();
  }

  setTask() {
   /* this.api.getMultiplyTable()
      .pipe(first())
      .subscribe((task: SimpleTask) => {
        this.currentTask = task;
        this.appFacade.setProblemText(this.currentTask.problemText);
      });
*/
    let numArray = [2, 3, 4, 5, 6, 7, 8, 9];
    let m1;
    let m2;
    if (!this.lastTask[0] && !this.lastTask[1]) {
      m1 = numArray[getRandom(0, 7)];
      m2 = numArray[getRandom(0, 7)];
    } else {
      numArray = numArray.filter( value => value !== this.lastTask[0] && value !== this.lastTask[1]);
      m1 = numArray[getRandom(0, numArray.length - 1)];
      m2 = numArray[getRandom(0, numArray.length - 1)];
    }
    this.lastTask = [m1, m2];
    this.currentTask.problemText = `${m1} \\times ${m2}`;
    this.currentTask.answer = m1 * m2;
    this.appFacade.setProblemText(this.currentTask.problemText);

  }

  checkAns() {
    this.scoreMultiData.givenProblems += 1;
    if (+this.ans === this.currentTask.answer){
      this.ansHints.res = 'Правильно!';
      this.scoreMultiData.solvedProblems += 1;
      if (this.scoreMultiData.givenProblems < this.scoreMultiData.totalProblems - 1) {
        this.setTask();
      }
    } else {
      this.ansHints.res = 'Неправильно!';
    }

    if (this.scoreMultiData.givenProblems >= this.scoreMultiData.totalProblems) {
      this.ansHints.complete = 'Тренировка завершена!';
      this.appFacade.setInputDisabled(true);
      this.timeTask.stopTimer();
    }
    this.ans = '';
  }

  onInpDis(inputDisabled: boolean) {
    this.inputDisabled = inputDisabled;
  }
}
