import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ScoreData, SimpleTask, Visited} from '../modules/iface.module';
import {TimerTaskService} from '../services/timer-task.service';
import {ApiServices} from '../services/api.services';
import {first} from 'rxjs/operators';
import {AppFacade} from '../app.facade';

@Component({
  selector: 'app-lineareq',
  templateUrl: './lineareq.component.html',
  styleUrls: ['./lineareq.component.css']
})
export class LineareqComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('inputAns', {static: false}) inputAns: ElementRef;

  inputDisabled = false;
  scoreLinearData: ScoreData;
  currentTask: SimpleTask = new SimpleTask();
  ans = '';
  ansHints = {res: '', complete: ''};

  totalLevels = 6;
  lvl = 1;
  lvlArr = {
    lvl1: 4,
    lvl2: 8,
    lvl3: 12,
    lvl4: 15,
    lvl5: 18
  };
   t: Visited = new Visited();

  constructor(public timeTask: TimerTaskService, private api: ApiServices, private appFacade: AppFacade) {
      }

  ngOnInit(): void {
    this.appFacade.setIsTaskPage(true);
    this.appFacade.mkHeadersView('lineareq');
    this.scoreLinearData = {
      totalProblems: 20,
      givenProblems: 0,
      solvedProblems: 0
    };
    this.setTask();
    this.timeTask.initTimer(15);
    this.api.getVisited('lineareq')
      .pipe(first())
      .subscribe((visited: Visited) => {
      this.t = visited;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inputAns.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
    this.timeTask.stopTimer();
  }

  setTask() {
    this.api.getLinearEquation('' + this.lvl)
      .pipe(first())
      .subscribe((task: SimpleTask) => {
      this.currentTask = task;
      this.appFacade.setProblemText(this.currentTask.problemText);
      });
    this.appFacade.setDescription(`Уровень ${this.lvl}`);
  }

  checkAns() {
    if (+this.ans !== this.currentTask.answer) {
      this.ansHints.res = 'Неправильно!';

    } else {
      this.ansHints.res = 'Правильно!';
      this.scoreLinearData.solvedProblems += 1;
      if (this.scoreLinearData.solvedProblems >= this.lvlArr['lvl' + this.lvl] && this.lvl < this.totalLevels) {
        this.lvl += 1;
      }
      if (this.scoreLinearData.givenProblems < this.scoreLinearData.totalProblems - 1) {
        this.setTask();
      }
    }
    this.ans = '';
    this.scoreLinearData.givenProblems += 1;
    if (this.scoreLinearData.givenProblems >= this.scoreLinearData.totalProblems) {
      this.ansHints.complete = 'Тренировка завершена!';
      this.appFacade.setInputDisabled(true);
      this.timeTask.stopTimer();
    }
  }

  onInpDis(inpDis: boolean) {
    this.inputDisabled = inpDis;
  }
}
