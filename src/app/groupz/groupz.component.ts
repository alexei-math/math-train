import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ViewData, ScoreData} from '../modules/modules';
import { getRandom} from '../modules/math';

@Component({
  selector: 'app-groupz',
  templateUrl: './groupz.component.html',
  styleUrls: ['./groupz.component.css'],
})
export class GroupzComponent implements OnInit, AfterViewInit {

  // private ansTxt: ElementRef;

  @ViewChild('answerText', {static: false}) ansTxt: ElementRef;
  viewGroupZData: ViewData;
  scoreGroupZData: ScoreData;

  a: number;
  b: number;
  modifB = '';
  flagNegative = false;
  flagNegativeA = false;
  flagNegativeB = false;
  problemText = '';
  isAnswerRight = false;
  res = 0;
  answerRecense = '';
  tempStr = '';
  valueAnswerText = '';

  constructor() { }

  ngOnInit(): void {
    this.viewGroupZData = {
      header: 'Сложение и вычитание целых чисел',
      description: '',
      problemText: '',
      inputDisabled: false
    };
    this.scoreGroupZData = {
      totalProblems: 50,
      givenProblems: 0,
      solvedProblems: 0
    };
    this.setTask();
    // this.ansTxt.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    this.ansTxt.nativeElement.focus();
  }

  setTask() {
    this.a = getRandom(1, 50);
    this.b = getRandom(1, 50);
    this.flagNegative = !!getRandom(0, 1);
    this.flagNegativeA = !!getRandom(0, 1);
    this.flagNegativeB = !!getRandom(0, 1);
    if (this.flagNegativeB) {
      this.b = - this.b;
      this.modifB = `(${this.b})`;
    } else {
      this.modifB = `${this.b}`;
    }
    if (this.flagNegativeA) {
      this.a = - this.a;
    }
    if (this.flagNegative) {
      this.problemText = `${this.a} - ${this.modifB}`;
      this.viewGroupZData.problemText = `${this.a} - ${this.modifB}`;
    } else {
      this.problemText = `${this.a} + ${this.modifB}`;
      this.viewGroupZData.problemText = `${this.a} + ${this.modifB}`;
    }
  }

  checkAnswer(event: KeyboardEvent) {
    this.tempStr = (event.target as HTMLInputElement).value;
    this.res = (this.flagNegative) ? this.a - this.b : this.a + this.b;
    this.isAnswerRight = this.res === Number(this.tempStr);
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
      this.viewGroupZData.inputDisabled = true;
    }
  }
}
