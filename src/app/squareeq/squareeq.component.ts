import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ViewData, ScoreData} from '../modules/iface.module';
import { getRandom, GCD} from '../modules/math.module';
import {TimerTaskService} from '../services/timer-task.service';

interface CoeffSE {
  a: number;
  b: number;
  c: number;
}

interface RootsSE {
  x1: number;
  x2: number;
}

@Component({
  selector: 'app-squareeq',
  templateUrl: './squareeq.component.html',
  styleUrls: ['./squareeq.component.css']
})

export class SquareeqComponent implements OnInit, OnDestroy {

  @ViewChild('inpXTxt', {static: true}) inpX1: ElementRef;

  viewSqEqData: ViewData;
  scoreSqEqData: ScoreData;

  coeffSE: CoeffSE;
  rootsSE: RootsSE;
  levelEq: number;
  pointsLevel = {lvl1: 3, lvl2: 6, lvl3: 9};
  flagsAnsHints = [0, 0, 0, 0, 0];
  flagIncorrectAnswer = false;
  answerHints = {m1: '', m2: '', m3: '', m4: '', m5: '', res: '', complete: ''};
  inputsAns = {X1: '', X2: '', A: '', B: '', C: '', Disc: '', SqDisc: '', X1new: '', X2new: ''};


  constructor(private timeTask: TimerTaskService) {
  }

  ngOnInit(): void {

    this.viewSqEqData = {
      header: 'Уровень 1',
      description: 'Решите квадратное уравнение',
      problemText: '',
      inputDisabled: false
    };
    this.scoreSqEqData = {
      totalProblems: 12,
      givenProblems: 0,
      solvedProblems: 0
    };
    this.levelEq = 1;
    this.setTask(this.levelEq);
    this.timeTask.initTimer(15);
  }

 ngOnDestroy(): void {
    this.timeTask.stopTimer();
 }

  setTask(level: number) {

    let minR;
    let maxR;
    this.inputsAns.X1 = '';
    this.inputsAns.X2 = '';
    this.inputsAns.A = '';
    this.inputsAns.B = '';
    this.inputsAns.C = '';

    switch (level) {
      case 1: minR = 1;
              maxR = 10;
              this.rootsSE = { x1: getRandom(minR, maxR), x2: getRandom(minR, maxR)};
              break;
      case 2: minR = 0;
              maxR = 15;
              this.rootsSE = { x1: getRandom(minR, maxR), x2: getRandom(-maxR, -minR)};
              break;
      case 3: minR = -15;
              maxR = 15;
              this.rootsSE = { x1: getRandom(minR, maxR), x2: getRandom(minR, maxR)};
              break;
      case 4: minR = -9;
              maxR = 9;
              const  tempSign = (getRandom(0, 1)) ? 1 : -1;
              this.rootsSE = { x1: tempSign * getRandom(1, 9) , x2: getRandom(minR, maxR)};
    }

    switch (level) {
      case 1:
      case 2: this.coeffSE = {a: 1, b: - (this.rootsSE.x1 + this.rootsSE.x2), c: this.rootsSE.x1 * this.rootsSE.x2};
              break;
      case 3: const tempSign = (getRandom(0, 1)) ? 1 : -1;
              this.coeffSE = {
                a: tempSign,
                b: -tempSign * (this.rootsSE.x1 + this.rootsSE.x2),
                c: tempSign * this.rootsSE.x1 * this.rootsSE.x2
              };
              break;
      case 4: const ta = 10;
              const tb = 10 * this.rootsSE.x1 + this.rootsSE.x2;
              const tc = this.rootsSE.x1 * this.rootsSE.x2;
              const  gcd = GCD(ta, GCD(Math.abs(tb), Math.abs(tc)));
              const tempSign1 = (getRandom(0, 1)) ? 1 : -1;
              this.coeffSE = {a: tempSign1 * ta / gcd, b: -tempSign1 * tb / gcd, c: tempSign1 * tc / gcd};
    }

    this.viewSqEqData.inputDisabled = false;
    if (level <= 2) {
      let tmpStr = 'x^2';
      if (this.coeffSE.b > 0) {
        tmpStr += '+' + ((this.coeffSE.b === 1) ? '' : this.coeffSE.b) + 'x';
      } else if (this.coeffSE.b < 0) {
        tmpStr +=  ((this.coeffSE.b === -1) ? '-' : this.coeffSE.b) + 'x';
      }
      if (this.coeffSE.c > 0) {
        tmpStr += '+' + this.coeffSE.c;
      } else if (this.coeffSE.c < 0) {
        tmpStr += this.coeffSE.c ;
      }
      tmpStr += '= 0';
      this.viewSqEqData.problemText = tmpStr;
    }
    if (level > 2 ) {
      const perm = ['132', '213', '231', '312', '321'];
      const xStr = ['x^2', 'x', ''];
      const coeff = [this.coeffSE.a, this.coeffSE.b, this.coeffSE.c];
      const n = getRandom(0, 4);
      const an = perm[n];
      let tempString = '';

      for (let i = 0; i < 3; i += 1) {
        const m = Number(an[i]) - 1;
        if (coeff[m] !== 0) {
          tempString += (coeff[m] > 0) ? '+' : '';
          tempString += coeff[m] + xStr[m];
        }
      }

      tempString += ' = 0';
      tempString = tempString.replace(/\+1x/g, '+x');
      tempString = tempString.replace(/-1x/g, '-x');
      tempString = tempString.replace(/^\+/, '');

      this.viewSqEqData.problemText = tempString;
    }

    this.inpX1.nativeElement.focus();

  }

    checkAnswer() {
      let res: boolean;
      if (this.levelEq < 4) {
        res = this.rootsSE.x1 === Number(this.inputsAns.X1) && this.rootsSE.x2 === Number(this.inputsAns.X2)
                || this.rootsSE.x1 === Number(this.inputsAns.X2) && this.rootsSE.x2 === Number(this.inputsAns.X1);
      } else {
        const x1 = Number(this.inputsAns.X1.replace(',', '.'));
        const x2 = Number(this.inputsAns.X2.replace(',', '.'));
        res = x1 * 10 === this.rootsSE.x1 && x2 === this.rootsSE.x2
                || x1 === this.rootsSE.x1 && x2 * 10 === this.rootsSE.x2
                || x1 * 10 === this.rootsSE.x2 && x2 === this.rootsSE.x1
                || x1 === this.rootsSE.x2 && x2 * 10 === this.rootsSE.x1;
      }

      if (res) {
        this.answerHints.res = 'Правильно!';
        this.scoreSqEqData.givenProblems += 1;
        if (!this.flagIncorrectAnswer) {
          this.scoreSqEqData.solvedProblems += 1;
        }
        this.flagIncorrectAnswer = false;
        if (this.scoreSqEqData.solvedProblems >= this.pointsLevel.lvl1 && this.levelEq === 1) {
          this.levelEq = 2;
          this.viewSqEqData.header = 'Уровень 2';
        }
        if (this.scoreSqEqData.solvedProblems >= this.pointsLevel.lvl2 && this.levelEq === 2) {
          this.levelEq = 3;
          this.viewSqEqData.header = 'Уровень 3';
        }
        if (this.scoreSqEqData.solvedProblems >= this.pointsLevel.lvl3 && this.levelEq === 3) {
          this.levelEq = 4;
          this.viewSqEqData.header = 'Уровень 4';
        }
        if (this.scoreSqEqData.givenProblems >= this.scoreSqEqData.totalProblems){
          this.answerHints.complete = 'Тренировка завершена!';
          this.viewSqEqData.inputDisabled = true;
        } else {
          this.setTask(this.levelEq);
        }
        this.answerHints.m1 = '';
        this.answerHints.m2 = '';
        this.answerHints.m3 = '';
        this.answerHints.m4 = '';
        this.answerHints.m5 = '';
        this.inputsAns.Disc = '';
        this.inputsAns.SqDisc = '';
        this.inputsAns.X1new = '';
        this.inputsAns.X2new = '';
        this.flagsAnsHints = [0, 0, 0, 0, 0];
      } else {
        this.flagIncorrectAnswer = true;
        this.answerHints.res = 'Неправильно!';
    }
  }

  showHint() {
    if (this.flagsAnsHints[0] === 0) {
      this.flagsAnsHints[0] = 1;
    }
  }

  levelHint(num: number) {
    return this.flagsAnsHints[num - 1];
  }

  checkABC() {
    if (Number(this.inputsAns.A) !== this.coeffSE.a
         || Number(this.inputsAns.B) !== this.coeffSE.b
          || Number(this.inputsAns.C) !== this.coeffSE.c) {
     this.answerHints.m1 = 'Неправильно!';
     this.flagsAnsHints[1] = 0;
    } else {
     this.answerHints.m1 = 'Правильно!';
     this.flagsAnsHints[1] = 1;
    }
  }

  checkDisc() {
    let D;
    D = this.coeffSE.b * this.coeffSE.b - 4 * this.coeffSE.a * this.coeffSE.c;
    if (Number(this.inputsAns.Disc) !== D) {
      this.answerHints.m2 = 'Неправильно!';
      this.flagsAnsHints[2] = 0;
    } else {
      this.answerHints.m2 = 'Правильно!';
      this.flagsAnsHints[2] = 1;
    }
  }

  checkSqDisc() {
    const sqD = Math.sqrt(this.coeffSE.b * this.coeffSE.b - 4 * this.coeffSE.a * this.coeffSE.c);

    if (Number(this.inputsAns.SqDisc) !== sqD) {
      this.answerHints.m3 = 'Неправильно!';
      this.flagsAnsHints[3] = 0;
    } else {
      this.answerHints.m3 = 'Правильно!';
      this.flagsAnsHints[3] = 1;
    }
  }

  checkX1new() {
    const x1 = (- this.coeffSE.b - Math.sqrt(this.coeffSE.b * this.coeffSE.b - 4 * this.coeffSE.a * this.coeffSE.c)) / (2 * this.coeffSE.a);
    if (10 * Number(this.inputsAns.X1new.toString().replace(',', '.')) - 10 * x1) {
      this.answerHints.m4 = 'Неправильно!';
      this.flagsAnsHints[4] = 0;
     } else {
      this.answerHints.m4 = 'Правильно!';
      this.flagsAnsHints[4] = 1;
    }
  }

  checkX2new() {
    const x2 = (- this.coeffSE.b + Math.sqrt(this.coeffSE.b * this.coeffSE.b - 4 * this.coeffSE.a * this.coeffSE.c)) / (2 * this.coeffSE.a);

    if (10 * Number(this.inputsAns.X2new.toString().replace(',', '.')) - 10 * x2) {
      this.answerHints.m5 = 'Неправильно!';
      this.flagsAnsHints[5] = 0;
    } else {
      this.answerHints.m5 = 'Правильно!';
      this.answerHints.res = '';
      this.flagsAnsHints[5] = 1;
      this.inpX1.nativeElement.focus();
      for (let i = 0; i < 3; i += 1) {
        this.flagsAnsHints[i] = 0;
      }
      this.inputsAns.X1 = '';
      this.inputsAns.X2 = '';
    }
  }
}
