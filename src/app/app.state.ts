import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

export interface Answers {
  answers: number[];
}

export interface Trainer {
  name: string;
  header: string;
  subheader: string;
  description: string;
}

const trainers: Trainer[] = [
  {
    name: 'multtab',
    header: 'Таблица умножения',
    subheader: 'Чему равно произведение?',
    description: 'Чему равно произведение?'
  },
  {
    name: 'groupz',
    header: 'Сложение и вычитание целых чисел',
    subheader: 'Найдите значение выражения',
    description: 'Найдите значение выражения'
  },
  {
    name: 'ringz',
    header: 'Умножение и деление целых чисел',
    subheader: 'Найдите значение выражения',
    description: 'Найдите значение выражения'
  },
  {
    name: 'groupq',
    header: 'Сложение и вычитание дробей',
    subheader: 'Найдите значение выражения',
    description: 'Найдите значение выражения'
  },
  {
    name: 'groupqm',
    header: 'Умножение и деление дробей',
    subheader: 'Найдите значение выражения',
    description: 'Найдите значение выражения'
  },
  {
    name: 'lineareq',
    header: 'Линейные уравнения',
    subheader: 'Решите уравнение',
    description: 'Решите уравнение'
  },
  {
    name: 'squareeq',
    header: 'Квадратные уравнения',
    subheader: 'Решите уравнение',
    description: 'Решите уравнение'
  }
];

@Injectable({providedIn: 'root'})
export class AppState {

  private readonly currentTrain$ = new BehaviorSubject<string>('');
  private readonly isTaskPage$ = new BehaviorSubject<boolean>(false);

  private readonly problemText$ = new BehaviorSubject<string>('');
  private readonly header$ = new BehaviorSubject<string>('');
  private readonly description$ = new BehaviorSubject<string>('');
  private readonly inputDisabled$ = new BehaviorSubject<boolean>(false);
  private readonly totalProblems$ = new BehaviorSubject<number>(20);
  private readonly givenProblems$ = new BehaviorSubject<number>(0);
  private readonly solvedProblems$ = new BehaviorSubject<number>(0);

  // private readonly answers$ = new BehaviorSubject<Answers>();

  getCurrentTrain$(): Observable<string> {
    return this.currentTrain$.asObservable();
  }

  getIsTaskPage$(): Observable<boolean> {
    return this.isTaskPage$.asObservable();
  }

  getProblemText$(): Observable<string> {
    return this.problemText$.asObservable();
  }

  getProblemText(): string {
    return this.problemText$.getValue();
  }

  getHeader$(): Observable<string> {
    return this.header$.asObservable();
  }

  getDescription$(): Observable<string> {
    return this.description$.asObservable();
  }

  getInputDisabled$(): Observable<boolean> {
    return this.inputDisabled$.asObservable();
  }

  getTotalProblems$(): Observable<number> {
    return this.totalProblems$.asObservable();
  }

  getGivenProblems$(): Observable<number> {
    return this.givenProblems$.asObservable();
  }

  getSolvedProblems$(): Observable<number> {
    return this.solvedProblems$.asObservable();
  }

  setCurrentTrain(train: string): void {
    this.currentTrain$.next(train);
  }

  setIsTaskPage(task: boolean) {
    this.isTaskPage$.next(task);
  }

  setProblemText(problemText: string): void {
    this.problemText$.next(problemText);
  }

  setHeader(header: string): void {
    this.header$.next(header);
  }

  setDescription(description: string): void {
    this.description$.next(description);
  }

  setInputDisabled(inputDisabled: boolean): void {
    this.inputDisabled$.next(inputDisabled);
  }

  setTotalProblems(totalProblems: number): void {
    this.totalProblems$.next(totalProblems);
  }

  setGivenProblems(givenProblems: number): void {
    this.givenProblems$.next(givenProblems);
  }

  setSolvedProblems(solvedProblems: number): void {
    this.solvedProblems$.next(solvedProblems);
  }

  getTrainersArray(): Trainer[] {
    return trainers;
  }
}
