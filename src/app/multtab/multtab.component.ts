import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ScoreData, SimpleTask, Visited} from '../modules/iface.module';
import {TimerTaskService} from '../services/timer-task.service';
import {ApiServices} from '../services/api.services';
import {Subscription} from 'rxjs';
import {AppFacade} from '../app.facade';
import {first} from 'rxjs/operators';

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
    this.api.getMultiplyTable()
      .pipe(first())
      .subscribe((task: SimpleTask) => {
        this.currentTask = task;
        this.appFacade.setProblemText(this.currentTask.problemText);
      });
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
