import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ViewData, ScoreData, Visited} from '../modules/iface.module';
import { getRandom } from '../modules/math.module';
import {TimerTaskService} from '../services/timer-task.service';
import {VisitedService} from '../services/visited.service';

@Component({
  selector: 'app-multtab',
  templateUrl: './multtab.component.html',
  styleUrls: ['./multtab.component.css']
})
export class MulttabComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('inputAns', {static: false}) inpAns: ElementRef;
  @Output() changeTime: EventEmitter<string> = new EventEmitter<string>();

  viewMultiData: ViewData;
  scoreMultiData: ScoreData;
  numberTask = {firstNumber: 0, secondNumber: 0};
  ans = '';
  ansHints = {res: '', complete: ''};
  timesVisitedPage: number;
  t: Visited = new Visited();

  constructor(public timeTask: TimerTaskService, private visited: VisitedService) {
  }

  ngOnInit(): void {

    this.viewMultiData = {
      header: 'Таблица умножения',
      description: '',
      problemText: '' ,
      inputDisabled: false
      };

    this.scoreMultiData = {
      totalProblems: 50,
      givenProblems: 0,
      solvedProblems: 0
    };

    this.setTask();
    this.timeTask.initTimer(10);
    this.visited.getVisited('multtab').subscribe( (visited: Visited) => {
    this.t = visited;
    });

  }

  ngAfterViewInit(): void {
    this.inpAns.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.timeTask.stopTimer();
  }

  setTask() {
    this.numberTask.firstNumber = getRandom(2, 9);
    this.numberTask.secondNumber = getRandom(2, 9);
    this.viewMultiData.problemText = this.numberTask.firstNumber + ' \\times ' + this.numberTask.secondNumber;
  }

  checkAns() {
    if (Number(this.ans) === this.numberTask.firstNumber * this.numberTask.secondNumber) {
      this.ansHints.res = 'Правильно!';
      this.scoreMultiData.solvedProblems += 1;
      if (this.scoreMultiData.givenProblems < this.scoreMultiData.totalProblems) {
        this.setTask();
      }
    } else {
      this.ansHints.res = 'Неправильно!';
    }
    this.ans = '';
    this.scoreMultiData.givenProblems += 1;
    if (this.scoreMultiData.givenProblems >= this.scoreMultiData.totalProblems) {
      this.ansHints.complete = 'Тренировка завершена!';
      this.viewMultiData.inputDisabled = true;
      this.timeTask.stopTimer();
    }
  }
}
