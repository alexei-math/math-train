import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ScoreData, ViewData} from '../modules/modules';
import {getRandom, NumQ} from '../modules/math';

@Component({
  selector: 'app-groupq',
  templateUrl: './groupq.component.html',
  styleUrls: ['./groupq.component.css']
})
export class GroupqComponent implements OnInit {

   @ViewChild('nominatorInput', {static: true}) nomInp: ElementRef;
   @ViewChild('denominatorInput', {static: true}) denomInp: ElementRef;

  viewData: ViewData;
  scoreGQData: ScoreData = {
    totalProblems: 20,
    solvedProblems: 0,
    givenProblems: 0
  };
  frac1: NumQ;
  frac2: NumQ;
  fracA = {
    nominA: '',
    denomA: ''
  };
  levelQ: number;
  lvlArr = {
    lvl2: 2,
    lvl3: 4,
    lvl4: 6,
    lvl5: 8,
    lvl6: 10
  };
  isAnswerRight: boolean;
  answerRecense = '';

  constructor() {
    this.frac1 = new NumQ();
    this.frac2 = new NumQ();
  }

  ngOnInit(): void {

    this.viewData = {
      header: 'Сложение дробей',
      description: 'Найдите значение выражения',
      problemText: '',
      inputDisabled: false
    };

    this.levelQ = 1;
    this.isAnswerRight = false;
    this.setTask();
  }

  setTask(): void {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

    if (this.levelQ === 1) {
      const denominator = primes[getRandom(1, 9)];
      const nominator1 = getRandom(1, Math.floor(denominator / 2));
      const nominator2 = getRandom(1, Math.floor(denominator / 2));
      this.setFracs(nominator1, nominator2, denominator, denominator);
      this.viewData.problemText = '\\frac{' + this.frac1.nom + '}{' + this.frac1.denom + '}';
      this.viewData.problemText += '+ \\frac{' + this.frac2.nom + '}{' + this.frac2.denom + '}';
    } else if (this.levelQ === 2) {
      this.viewData.header = 'Вычитание дробей';
      const denominator = primes[getRandom(2, 9)];
      const nominator1 = getRandom(Math.ceil(denominator / 2), denominator - 1);
      const nominator2 = getRandom(1, Math.floor(denominator / 2));
      this.setFracs(nominator1, nominator2, denominator, denominator)
      this.viewData.problemText = '\\frac{' + this.frac1.nom + '}{' + this.frac1.denom + '}';
      this.viewData.problemText += '- \\frac{' + this.frac2.nom + '}{' + this.frac2.denom + '}';
    } else  if (this.levelQ === 3) {
      this.viewData.header = 'Сложение и вычитание дробей';
      const d1 = primes[getRandom(1, 3)];
      const d2 = primes[getRandom(1, 2)];
      let den1: number;
      let den2: number;
      if (getRandom(0, 1)) {
        den1 = d1;
        den2 = d2;
      } else {
        den1 = d2;
        den2 = d1;
      }
      const nom1 = Math.floor(den1 / 2);
      const nom2 = Math.floor(den2 / 2);
      this.setFracs(nom1, nom2, den1, den2);
      this.viewData.problemText = '\\frac{' + this.frac1.nom + '}{' + this.frac1.denom + '}';
      this.viewData.problemText += '+ \\frac{' + this.frac2.nom + '}{' + this.frac2.denom + '}';
    }

    this.nomInp.nativeElement.focus();
  }

  checkAnswer(): void {
    const tmpQ: NumQ = new NumQ(Number(this.fracA.nominA), Number(this.fracA.denomA));
    let tmpQ1: NumQ;
    if (this.levelQ === 1 || this.levelQ === 3) {
      tmpQ1 = this.frac1.add(this.frac2);
    } else if (this.levelQ === 2) {
      tmpQ1 = this.frac1.subtract(this.frac2);
    }


    if (tmpQ1.isEqual(tmpQ)) {
      this.answerRecense = 'Правильно!';
      this.isAnswerRight = true;
      this.fracA.nominA = this.fracA.denomA = '';
      this.scoreGQData.solvedProblems += 1;
      if (this.scoreGQData.solvedProblems >= this.lvlArr.lvl2 && this.levelQ === 1) {
        this.levelQ = 2;
      } else if (this.scoreGQData.solvedProblems >= this.lvlArr.lvl3 && this.levelQ === 2) {
        this.levelQ = 3;
      }
      this.setTask();
    } else {
      this.answerRecense = 'Неправильно!';
      this.isAnswerRight = false;
    }
    this.scoreGQData.givenProblems += 1;
  }

  nomEnter() {
    this.denomInp.nativeElement.focus();
  }

  setFracs(nominator1: number, nominator2: number, denominator1: number, denominator2: number) {
    this.frac1.nom = nominator1;
    this.frac1.denom = denominator1;
    this.frac2.nom = nominator2;
    this.frac2.denom = denominator2;
  }

}
