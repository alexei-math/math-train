import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GCD, getRandom, NumQ} from '../modules/math.module';
import {OperationType, ScoreData, Visited} from '../modules/iface.module';
import {TimerTaskService} from '../services/timer-task.service';
import {ApiServices} from '../services/api.services';
import {first} from 'rxjs/operators';
import {AppFacade} from '../app.facade';

@Component({
  selector: 'app-groupqm',
  templateUrl: './groupqm.component.html',
  styleUrls: ['./groupqm.component.css']
})
export class GroupqmComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('nominatorInput') nomInp: ElementRef;
  @ViewChild('denominatorInput') denInp: ElementRef;

  inputDisabled = false;

  frac1: NumQ;
  frac2: NumQ;
  fracTemp: NumQ;
  fracAns = {
    nominAns: '',
    denomAns: ''
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
  totalLevels = 6;
  lvlArr = {
    lvl1: 3,
    lvl2: 6,
    lvl3: 9,
    lvl4: 12,
    lvl5: 16
  };
  t: Visited = new Visited();

  constructor(public timeTask: TimerTaskService, private api: ApiServices, private appFacade: AppFacade) {
    this.frac1 = new NumQ();
    this.frac2 = new NumQ();
    this.fracTemp = new NumQ();
  }

  ngOnInit(): void {
    this.appFacade.mkHeadersView('groupqm');
    this.setTask();
    this.timeTask.initTimer(15);
    this.api.getVisited('groupqm')
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

  setTask() {
    const limSmallArray = 5;
    let limMiddleArray;
    let limBigArray = 11;
    let op;
    let smallNumberArray = [];
    let middleNumberArray = [];
    let bigNumberArray = [];
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
      case 5:
      case 6: this.operation = (this.level === 5) ? OperationType.Multiply : OperationType.Divide;
              op = (this.level === 5) ? ' \\cdot ' : ' : ';
              smallNumberArray = [1, 2, 3, 5, 7];
              middleNumberArray = [2, 3, 5, 7, 11];
              bigNumberArray = [11, 13, 17, 19];
              const a = bigNumberArray[getRandom(0, bigNumberArray.length - 1)];  // ac/be x bf/ag == cf / eq
              let b;
              do{
                b = bigNumberArray[getRandom(0, bigNumberArray.length - 1)];
              } while (b === a);
              const c = smallNumberArray[getRandom(1, smallNumberArray.length - 1)];
              const f = smallNumberArray[getRandom(1, smallNumberArray.length - 1)];
              let e;
              do {
                e = middleNumberArray[getRandom(0, middleNumberArray.length - 1)];
              } while (e === a || e === c);
              let g;
              do {
                g = middleNumberArray[getRandom(0, middleNumberArray.length - 1)];
              } while (g === b || g === f);
              this.frac1.nom = a * c;
              this.frac1.denom = b * e;
              this.frac2.nom = b * f;
              this.frac2.denom = a * g;
              if (this.level === 6) {
                const temp = this.frac2.nom;
                this.frac2.nom = this.frac2.denom;
                this.frac2.denom = temp;
              }
              break;
    }

    this.appFacade.setProblemText('\\frac{' + this.frac1.nom + '}{' + this.frac1.denom + '}'
                                   + op + '\\frac{' + this.frac2.nom + '}{' + this.frac2.denom + '}');
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
    this.scoreData.givenProblems += 1;
    if (tempQ1.isEqual(tempQ)) {
      this.answerRecense = 'Правильно';
      this.isAnswerRight = true;
      this.scoreData.solvedProblems += 1;
      if (this.scoreData.solvedProblems >= this.lvlArr['lvl' + this.level] && this.level < this.totalLevels) {
        this.level += 1;
      }
      if (this.scoreData.givenProblems < this.scoreData.totalProblems) {
        this.setTask();
      }
    } else {
      this.answerRecense = 'Неправильно';
      this.isAnswerRight = false;
    }
    if (this.scoreData.givenProblems >= this.scoreData.totalProblems) {
      this.answerComplete = 'Тренировка закончена';
      this.appFacade.setInputDisabled(true);
      this.timeTask.stopTimer();
    }
    this.fracAns.nominAns = this.fracAns.denomAns = '';
    this.appFacade.setDescription(`Уровень ${this.level}`);
  }

  onInpDis(inputDisabled: boolean) {
    this.inputDisabled = inputDisabled;
  }
}
