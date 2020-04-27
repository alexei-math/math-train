import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GCD, getRandom, NumQ} from '../modules/math.module';
import {OperationType, ScoreData, ViewData} from '../modules/iface.module';
import {TimerTaskService} from '../services/timer-task.service';

@Component({
  selector: 'app-groupqm',
  templateUrl: './groupqm.component.html',
  styleUrls: ['./groupqm.component.css']
})
export class GroupqmComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('nominatorInput') nomInp: ElementRef;
  @ViewChild('denominatorInput') denInp: ElementRef;

  frac1: NumQ;
  frac2: NumQ;
  fracTemp: NumQ;
  fracAns = {
    nominAns: '',
    denomAns: ''
  };
  viewData: ViewData = {
    header: 'Умножение и деление дробей',
    description: 'Уровень 1',
    problemText: '',
    inputDisabled: false
  };
  scoreData: ScoreData = {
    totalProblems: 20,
    givenProblems: 0,
    solvedProblems: 0
  };
  answerRecense = '';
  answerComplete = '';
  isAnswerRight = false;
  level = 1;
  operation: OperationType;
  totalLevels = 4;
  lvlArr = {
    lvl1: 3,
    lvl2: 6,
    lvl3: 9
  };

  constructor(private timeTask: TimerTaskService) {
    this.frac1 = new NumQ();
    this.frac2 = new NumQ();
    this.fracTemp = new NumQ();
  }

  ngOnInit(): void {
    this.setTask();
    this.timeTask.initTimer(15);
  }

  ngAfterViewInit(): void {
    this.nomInp.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.timeTask.stopTimer();
  }

  setTask() {
    const limSmallArray = 5;
    let limMiddleArray;
    let limBigArray = 11;
    let op;
    const smallNumberArray = [];
    const middleNumberArray = [];
    const bigNumberArray = [];
    let tempArray;
    let i = 1;
    switch (this.level) {
      case 1:
      case 2: this.operation = (this.level === 1) ? OperationType.Multiply : OperationType.Divide;
              op = (this.level === 1) ? ' \\cdot ' : ' : ';
              i = 1;
              while (i <= limSmallArray) {
                smallNumberArray.push(i);
                i += 1;
              }
              i = 2;
              while (i <= limBigArray) {
                bigNumberArray.push(i);
                i += 1;
              }
              this.frac1.nom = smallNumberArray[getRandom(0, 9 * smallNumberArray.length - 1) % smallNumberArray.length];
              tempArray = bigNumberArray.filter((n) => n > this.frac1.nom && GCD(n, this.frac1.nom) === 1);
              this.frac1.denom = tempArray[getRandom(0, 9 * tempArray.length - 1) % tempArray.length];
              tempArray = smallNumberArray.filter((n) => GCD(n, this.frac1.denom) === 1);
              this.frac2.nom = tempArray[getRandom(0, 9 * tempArray.length - 1) % tempArray.length];
              tempArray = bigNumberArray.filter((n) => GCD(n, this.frac1.nom) === 1 && GCD(n, this.frac2.nom) === 1 && n > this.frac2.nom);
              this.frac2.denom = tempArray[getRandom(0, 9 * tempArray.length - 1) % tempArray.length];
              if (this.level === 2) {
                const temp = this.frac2.nom;
                this.frac2.nom = this.frac2.denom;
                this.frac2.denom = temp;
              }
              break;
      case 3:
      case 4: this.operation = (this.level === 3) ? OperationType.Multiply : OperationType.Divide;
              op = (this.level === 3) ? ' \\cdot ' : ' : ';
              limMiddleArray = 11;
              limBigArray = 29;
              i = 1;
              while (i <= limSmallArray) {
                smallNumberArray.push(i);
                i += 1;
              }
              i = 2;
              while (i <= limMiddleArray) {
                middleNumberArray.push(i);
                i += 1;
              }
              i = 2;
              while (i <= limBigArray) {
                bigNumberArray.push(i);
                i += 1;
              }
              this.frac1.nom = smallNumberArray[getRandom(0, 9 * smallNumberArray.length - 1) % smallNumberArray.length];
              tempArray = middleNumberArray.filter((n) => n > this.frac1.nom && GCD(n, this.frac1.nom) === 1);
              this.frac1.denom = tempArray[getRandom(0, 9 * tempArray.length - 1) % tempArray.length];
              this.frac2.nom = this.frac1.denom;
              tempArray = bigNumberArray.filter((n) => n > this.frac2.nom && GCD(n, this.frac2.nom) === 1);
              this.frac2.denom = tempArray[getRandom(0, 8 * tempArray.length - 1) % tempArray.length];
              if (this.level === 4) {
                const temp = this.frac2.nom;
                this.frac2.nom = this.frac2.denom;
                this.frac2.denom = temp;
              }
              break;
    }
    this.viewData.problemText = '\\frac{' + this.frac1.nom + '}{' + this.frac1.denom + '}'
      + op + '\\frac{' + this.frac2.nom + '}{' + this.frac2.denom + '}';
    smallNumberArray.length = bigNumberArray.length = 0;
  }

  nomEnter() {
    this.denInp.nativeElement.focus();
  }

  denEnter() {
    this.checkAnswer();
    this.nomInp.nativeElement.focus();
  }

  checkAnswer() {
    const tempQ: NumQ = new NumQ(+this.fracAns.nominAns, +this.fracAns.denomAns);
    let tempQ1: NumQ;
    switch (this.operation) {
      case 0: tempQ1 = this.frac1.add(this.frac2);
              break;
      case 1: tempQ1 = this.frac1.subtract(this.frac2);
              break;
      case 2: tempQ1 = this.frac1.multiply(this.frac2);
              break;
      case 3: tempQ1 = this.frac1.divide(this.frac2);
    }
    if (tempQ1.isEqual(tempQ)) {
      this.answerRecense = 'Правильно';
      this.isAnswerRight = true;
      this.scoreData.solvedProblems += 1;
      if (this.scoreData.solvedProblems >= this.lvlArr['lvl' + this.level] && this.level < this.totalLevels) {
        this.level += 1;
      }
      this.setTask();
    } else {
      this.answerRecense = 'Неправильно';
      this.isAnswerRight = false;
    }
    this.scoreData.givenProblems += 1;
    this.fracAns.nominAns = this.fracAns.denomAns = '';
    this.viewData.description = `Уровень ${this.level}`;
  }
}
