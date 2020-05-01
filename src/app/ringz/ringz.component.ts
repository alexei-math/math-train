import {AfterContentChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MathExpression, ScoreData, ViewData, Visited} from '../modules/iface.module';
import { getRandom } from '../modules/math.module';
import {mkMathExp} from '../modules/string.module';
import {TimerTaskService} from '../services/timer-task.service';
import {ApiServices} from '../services/api.services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-ringz',
  templateUrl: './ringz.component.html',
  styleUrls: ['./ringz.component.css']
})
export class RingzComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('ansText', {static: false}) ansText: ElementRef;

  viewData: ViewData;
  scoreRZData: ScoreData = {
    totalProblems: 27,
    givenProblems: 0,
    solvedProblems: 0
  };
  currentTask: MathExpression;
  tempMathExp1: MathExpression;
  tempMathExp2: MathExpression;
  answerText = '';
  isAnswerRight = false;
  answerRecense = '';

  levelZ: number;
  totalLevels = 7;
  lvlArr = {
    lvl1: 3 * this.scoreRZData.totalProblems / 21,
    lvl2: 6 * this.scoreRZData.totalProblems / 21,
    lvl3: 9 * this.scoreRZData.totalProblems / 21,
    lvl4: 12 * this.scoreRZData.totalProblems / 21,
    lvl5: 15 * this.scoreRZData.totalProblems / 21,
    lvl6: 18 * this.scoreRZData.totalProblems / 21
  };

  t: Visited = new Visited();

  constructor(public timeTask: TimerTaskService, private api: ApiServices) {
  }

  ngOnInit(): void {
    this.levelZ = 1;
    this.viewData = {
      header: 'Умножение и деление целых чисел',
      description: 'Уровень ' + this.levelZ,
      problemText: '',
      inputDisabled: false
    };
    this.currentTask = {
      leftExp: 0,
      rightExp: 0,
      operation: '*'
    };
    this.tempMathExp1 = {
      leftExp: 0,
      rightExp: 0,
      operation: '+'
    };
    this.tempMathExp2 = {
      leftExp: 0,
      rightExp: 0,
      operation: '+'
    };
    this.setTask();
    this.timeTask.initTimer(15);
    this.api.getVisited('ringz')
      .pipe(first())
      .subscribe((visited: Visited) => {
      this.t = visited;
    });
  }

   ngAfterViewInit() {
    setTimeout(() => {
      this.ansText.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
    this.timeTask.stopTimer();
  }

  setTask() {
    switch (this.levelZ) {
      case 1: this.currentTask.operation = '*';                 // умножение целых чисел
              this.currentTask.leftExp = this.mkMultSumTask(10);
              this.currentTask.rightExp = this.mkMultSumTask(10);
              break;
      case 2: this.currentTask.operation = ':';                 // деление целых чисел
              this.currentTask.rightExp = this.mkDenominator();
              this.currentTask.leftExp = this.mkNominator(this.currentTask.rightExp);
              break;
      case 3: this.fillTempMathExp(this.tempMathExp1, this.mkPMOperation());  // a * ( b + c)
              this.currentTask.leftExp = this.mkMultSumTask(11);
              this.currentTask.rightExp = this.tempMathExp1;
              this.currentTask.operation = '*';
              break;
      case 4: this.fillTempMathExp(this.tempMathExp1, this.mkPMOperation());  // (a +  b) * c
              this.currentTask.leftExp = this.tempMathExp1;
              this.currentTask.rightExp = this.mkMultSumTask(11);
              this.currentTask.operation = '*';
              break;
      case 5: this.fillTempMathExp(this.tempMathExp1, this.mkPMOperation()); // (a+b)*(c+d)
              this.fillTempMathExp(this.tempMathExp2, this.mkPMOperation());
              this.currentTask.leftExp = this.tempMathExp1;
              this.currentTask.rightExp = this.tempMathExp2;
              this.currentTask.operation = '*';
              break;
      case 6: this.fillTempMathExp(this.tempMathExp1);  // a*b + c*d
              this.fillTempMathExp(this.tempMathExp2);
              this.currentTask.leftExp = this.tempMathExp1;
              this.currentTask.rightExp = this.tempMathExp2;
              this.currentTask.operation = this.mkPMOperation();
              break;
      case 7: this.fillTempMathExp(this.tempMathExp2); // a + b * c * d,  a la Discriminant
              this.tempMathExp1.leftExp = this.mkMultSumTask(11);
              this.tempMathExp1.rightExp = this.tempMathExp2;
              this.tempMathExp1.operation = '*';
              this.currentTask.leftExp = this.mkMultSumTask(11);
              this.currentTask.rightExp = this.tempMathExp1;
              this.currentTask.operation = this.mkPMOperation();
              break;
    }
    this.viewData.problemText = mkMathExp(this.currentTask).replace(/\*/g, ' \\cdot ');
  }

  fillTempMathExp(o: MathExpression, op: string = '*'): void {
    o.leftExp = this.mkMultSumTask(11);
    o.rightExp = this.mkMultSumTask(11);
    o.operation = op;
  }

  mkMultSumTask(num: number): number {
    let tempNum;
    if ( getRandom(0, 19) % 2 ) {
      tempNum = getRandom(-num, -2);
    } else {
      tempNum = getRandom(2, num);
    }
    return tempNum;
  }

  mkDenominator(): number {
    let tempNum;
    if (getRandom(0, 29) % 2) {
      tempNum = getRandom( -10, -2);
    } else {
      tempNum = getRandom(2, 10);
    }
    return tempNum;
  }

  mkNominator(num: number): number {
    let tempNum;
    if (getRandom(0, 29) % 2) {
      tempNum = getRandom(-15, -2) * num;
    } else {
      tempNum = getRandom(2, 15) * num;
    }
    return tempNum;
  }

  mkPMOperation(): string {
    if (getRandom(0, 29) % 2) {
      return '-';
    }
    return '+';
  }

  checkAnswer() {
    let modStr = this.viewData.problemText.replace(/\\cdot/g, '*');
    modStr = modStr.replace(':', '/');
    // tslint:disable-next-line:no-eval
    const res = eval(modStr);
    if (+this.answerText === +res) {
      this.answerRecense = 'Правильно!';
      this.scoreRZData.solvedProblems += 1;
      this.isAnswerRight = true;
      if (this.scoreRZData.solvedProblems >= this.lvlArr['lvl' + this.levelZ] && this.levelZ < this.totalLevels) {
        this.levelZ += 1;
      }
      if (this.scoreRZData.givenProblems < this.scoreRZData.totalProblems - 1) {
        this.setTask();
      }
    } else {
      this.answerRecense = 'Неправильно!';
      this.isAnswerRight = false;
    }
    this.answerText = '';
    this.scoreRZData.givenProblems += 1;
    if (this.scoreRZData.givenProblems >= this.scoreRZData.totalProblems) {
      this.answerRecense = 'Тренировка закончена!';
      this.viewData.inputDisabled = true;
      this.timeTask.stopTimer();
    }
    this.viewData.description = 'Уровень ' + this.levelZ;
    this.ansText.nativeElement.focus();
  }

}
