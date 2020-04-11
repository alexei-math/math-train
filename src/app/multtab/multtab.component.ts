import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ViewData, ScoreData} from '../modules/modules';
import { getRandom } from '../modules/math';

@Component({
  selector: 'app-multtab',
  templateUrl: './multtab.component.html',
  styleUrls: ['./multtab.component.css']
})
export class MulttabComponent implements OnInit, AfterViewInit {

  @ViewChild('inputAns', {static: false}) inpAns: ElementRef;
  viewMultiData: ViewData;
  scoreMultiData: ScoreData;

  numberTask = {firstNumber: 0, secondNumber: 0};
  ans = '';
  ansHints = {res: '', complete: ''};

  constructor() { }

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
  }

  ngAfterViewInit(): void {
    this.inpAns.nativeElement.focus();
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
    }
  }
}
