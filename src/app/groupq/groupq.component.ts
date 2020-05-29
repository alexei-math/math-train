import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QTask, ScoreData, Visited} from '../modules/iface.module';
import {TimerTaskService} from '../services/timer-task.service';
import {ApiServices} from '../services/api.services';
import {first} from 'rxjs/operators';
import {AppFacade} from '../app.facade';

@Component({
  selector: 'app-groupq',
  templateUrl: './groupq.component.html',
  styleUrls: ['./groupq.component.css']
})
export class GroupqComponent implements OnInit, AfterViewInit, OnDestroy {

   @ViewChild('nominatorInput', {static: false}) nomInp: ElementRef;
   @ViewChild('denominatorInput', {static: false}) denomInp: ElementRef;

  inputDisabled = false;
  scoreGQData: ScoreData = {
    totalProblems: 40,
    solvedProblems: 0,
    givenProblems: 0
  };
  fracA = {
    nominA: '',
    denomA: ''
  };
  levelQ: number;
  totalLevels = 8;
  lvlArr = {
    lvl1: 2 * this.scoreGQData.totalProblems / 20,
    lvl2: 4 * this.scoreGQData.totalProblems / 20,
    lvl3: 7 * this.scoreGQData.totalProblems / 20,
    lvl4: 10 * this.scoreGQData.totalProblems / 20,
    lvl5: 13 * this.scoreGQData.totalProblems / 20,
    lvl6: 16 * this.scoreGQData.totalProblems / 20,
    lvl7: 19 * this.scoreGQData.totalProblems / 20
  };

  isAnswerRight: boolean;
  answerRecense = '';
  answerComplete = '';

  t: Visited = new Visited();
  currentTask: QTask = new QTask();

  constructor(
    public timeTask: TimerTaskService,
    private api: ApiServices,
    private appFacade: AppFacade
  ) {}

  ngOnInit(): void {

    this.appFacade.mkHeadersView('groupq');

    this.levelQ = 1;
    this.isAnswerRight = false;
    this.setTask();
    this.timeTask.initTimer(15);
    this.api.getVisited('groupq')
      .pipe(first())
      .subscribe((visited: Visited) => {
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

  setTask(): void {
    this.api.getGroupQ('' + this.levelQ)
      .pipe(first())
      .subscribe((task: QTask) => {
        this.currentTask = task;
        this.appFacade.setProblemText(this.currentTask.problemText);
      });

    this.appFacade.setDescription('Уровень ' + this.levelQ);
  }

  checkAnswer(): void {
    if (+this.fracA.nominA === this.currentTask.answer.nominator && +this.fracA.denomA === this.currentTask.answer.denominator) {
      this.answerRecense = 'Правильно!';
      this.isAnswerRight = true;
      this.fracA.nominA = this.fracA.denomA = '';
      this.scoreGQData.solvedProblems += 1;
      if (this.scoreGQData.solvedProblems >= this.lvlArr['lvl' + this.levelQ] && this.levelQ < this.totalLevels) {
        this.levelQ += 1;
      }
      if (this.scoreGQData.givenProblems < this.scoreGQData.totalProblems - 1) {
        this.setTask();
      }
    } else {
      this.answerRecense = 'Неправильно!';
      this.isAnswerRight = false;
    }
    this.scoreGQData.givenProblems += 1;
    if (this.scoreGQData.givenProblems >= this.scoreGQData.totalProblems) {
      this.appFacade.setInputDisabled(true);
      this.answerComplete = 'Тренировка завершена!';
      this.timeTask.stopTimer();
    }
  }

  nomEnter() {
    this.denomInp.nativeElement.focus();
  }

  denEnter() {
    this.checkAnswer();
    this.nomInp.nativeElement.focus();
  }

  onInpDis(inputDisabled: boolean) {
    this.inputDisabled = inputDisabled;
  }
}
