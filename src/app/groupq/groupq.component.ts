import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {OperationType, ScoreData, Visited} from '../modules/iface.module';
import {GCD, getRandom, NumQ} from '../modules/math.module';
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
   @Output() changeTime: EventEmitter<string> = new EventEmitter<string>();

  inputDisabled = false;
  scoreGQData: ScoreData = {
    totalProblems: 40,
    solvedProblems: 0,
    givenProblems: 0
  };
  frac1: NumQ;
  frac2: NumQ;
  fract: NumQ;
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
  operation: OperationType;  // 0 - сложение, 1 - вычитание, 2 - умножение, 3 - деление
  answerRecense = '';
  answerComplete = '';

  t: Visited = new Visited();

  constructor(public timeTask: TimerTaskService, private api: ApiServices, private appFacade: AppFacade) {
    this.frac1 = new NumQ();
    this.frac2 = new NumQ();
    this.fract = new NumQ();
    }

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
      this.nomInp.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
   this.timeTask.stopTimer();
  }

  setTask(): void {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    let nominator1: number;
    let nominator2: number;
    let denominator1: number;
    let denominator2: number;
    let d1: number;
    let d2: number;
    let a;
    let b;
    let c;
    let d;

    switch (this.levelQ) {
      case 1: denominator1 = denominator2 = primes[getRandom(1, 9)];
              nominator1 = getRandom(1, Math.floor(denominator1 / 2));
              nominator2 = getRandom(1, Math.floor(denominator2 / 2));
              this.operation = OperationType.Add; // сложение
              break;
      case 2: denominator1 = denominator2 = primes[getRandom(2, 9)];
              nominator1 = getRandom(Math.ceil(denominator1 / 2), denominator1 - 1);
              nominator2 = getRandom(1, Math.floor(denominator2 / 2));
              this.operation = OperationType.Subtract; // вычитание
              break;
      case 3: do {
                  d1 = primes[getRandom(3, 5)];
                  d2 = primes[getRandom(0, 2)];
                  if (getRandom(0, 10) % 2) {
                    denominator1 = d1;
                    denominator2 = d2 * d1;
                  } else {
                    denominator1 = d2 * d1;
                    denominator2 = d1;
                  }
                  nominator1 = getRandom(1, Math.floor(denominator1 / 2));
                  nominator2 = getRandom(1, Math.floor(denominator2 / 2));
              } while (GCD(nominator1, denominator1) * GCD(nominator2, denominator2) !== 1);
              this.operation = OperationType.Add; // сложение
              break;
      case 4: do {
                  d1 = primes[getRandom(3, 5)];
                  d2 = primes[getRandom(0, 2)];
                  if (getRandom(0, 10) % 2) {
                    denominator1 = d1;
                    denominator2 = d2 * d1;
                  } else {
                    denominator1 = d2 * d1;
                    denominator2 = d1;
                  }
                  nominator1 = getRandom(Math.ceil(denominator1 / 2), denominator1 - 1);
                  nominator2 = getRandom(1, Math.floor(denominator2 / 2));
              } while (GCD(nominator1, denominator1) * GCD(nominator2, denominator2) !== 1);
              this.operation = OperationType.Subtract; // вычитание
              break;
      case 5: denominator1 = primes[getRandom(0, 9)];
              do {
                denominator2 = primes[getRandom(0, 5)];
              } while (GCD(denominator1, denominator2) !== 1);
              nominator1 = getRandom(1, Math.floor(denominator1 / 2));
              nominator2 = getRandom(1, Math.floor(denominator2 / 2));
              this.operation = OperationType.Add;
              break;
      case 6: denominator1 = primes[getRandom(0, 9)];
              do {
                denominator2 = primes[getRandom(0, 5)];
              } while (GCD(denominator1, denominator2) !== 1);
              nominator1 = getRandom(1, denominator1 - 1);
              do {
                nominator2 = getRandom(1, denominator2 - 1);
              } while (nominator1 * denominator2 === nominator2 * denominator1);
              if (nominator1 * denominator2 - nominator2 * denominator1 < 0) {
                let t;
                t = nominator1;
                nominator1 = nominator2;
                nominator2 = t;
                t = denominator1;
                denominator1 = denominator2;
                denominator2 = t;
              }
              this.operation = OperationType.Subtract;
              break;
      case 7: this.operation = getRandom(0, 10) % 2;
              a = primes[getRandom(0, 3)];            // Знаменатели a*b*c и a*b*d, c != d
              b = primes[getRandom(0, 3)];
              c = primes[getRandom(0, 4)];

              do {
                d = primes[getRandom(0, 4)];
              } while (d === c);
              denominator1 = a * b * c;
              denominator2 = a * b * d;
              break;
      case 8: const arr = [2, 3, 5, 7];
              let i = getRandom(1, 40) % 4;
              denominator1 = arr[i];
              arr.splice(i, 1);
              i = getRandom(1, 30) % 3;
              denominator1 *= arr[i];
              arr.splice(i, 1);
              i = getRandom(1, 20) % 2;
              denominator2 = arr[i];
              arr.splice(i, 1);
              denominator2 *= arr[0];
              c = primes[getRandom(0, 30) % 3];
              denominator1 *= c;
              denominator2 *= c;
              this.operation = getRandom(0, 10) % 2 === 0 ? OperationType.Add : OperationType.Subtract;
              break;
      default: nominator2 = nominator1 = denominator2 = denominator1 = 1;
    }

    if (this.levelQ === 7 || this.levelQ === 8) {
      if (this.operation === OperationType.Add) {
        do {
          nominator1 = getRandom(1, Math.floor(denominator1 / 2));
        } while (GCD(nominator1, denominator1) !== 1);
        do {
          nominator2 = getRandom(1, Math.floor(denominator2 / 2));
        } while (GCD(nominator2, denominator2) !== 1);
      } else {
        do {
          nominator1 = getRandom(Math.ceil(denominator1 / 2), denominator1 - 1);
        } while (GCD(nominator1, denominator1) !== 1);
        do {
          nominator2 = getRandom(1, Math.floor(denominator2 / 2));
        } while (GCD(nominator2, denominator2) !== 1);
      }
    }

    this.appFacade.setDescription('Уровень ' + this.levelQ);
    this.setFracs(nominator1, denominator1, nominator2, denominator2);
    this.mkProblemText(this.operation);
  }

  checkAnswer(): void {
    const tmpQ: NumQ = new NumQ(Number(this.fracA.nominA), Number(this.fracA.denomA));
    let tmpQ1: NumQ;
    switch (this.operation) {
      case 0: tmpQ1 = this.frac1.add(this.frac2);
              break;
      case 1: tmpQ1 = this.frac1.subtract(this.frac2);
              break;
      case 2: tmpQ1 = this.frac1.multiply(this.frac2);
              break;
      case 3: tmpQ1 = this.frac1.multiply(this.frac2);
    }

    if (tmpQ1.isEqual(tmpQ)) {
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

  setFracs(nominator1: number, denominator1: number, nominator2: number, denominator2: number): void {
    // nominator{1,2} - числитель {1,2}-й дроби, denominator{1,2} - знаменатель {1,2}-й дроби

    this.frac1.nom = nominator1;
    this.frac1.denom = denominator1;
    this.frac1.reduce();
    this.frac2.nom = nominator2;
    this.frac2.denom = denominator2;
    this.frac2.reduce();
  }

  mkProblemText(s: number): void {
    // s - числовая переменная, 0 = сложение, 1 = вычитание, 2 = умножение, 3 = деление дробей
    let tmpStr = '';
    let op = '';
    switch (s) {
      case 0: op = ' + ';
              break;
      case 1: op = ' - ';
              break;
      case 2: op = ' * ';
              break;
      case 3: op = ' : ';
    }

    tmpStr += '\\frac{' + this.frac1.nom + '}{' + this.frac1.denom + '}';
    tmpStr += op;
    tmpStr += '\\frac{' + this.frac2.nom + '}{' + this.frac2.denom + '}';
    this.appFacade.setProblemText(tmpStr);
  }

  onInpDis(inputDisabled: boolean) {
    this.inputDisabled = inputDisabled;
  }
}
