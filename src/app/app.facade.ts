import {Injectable} from '@angular/core';
import {AppState, Trainer} from './app.state';
import {Observable} from 'rxjs';
import {ApiServices} from './services/api.services';


@Injectable({providedIn: 'root'})
export class AppFacade {

  constructor(private appState: AppState, private api: ApiServices) {
  }

  getHeader$(): Observable<string> {
    return this.appState.getHeader$();
  }

  getDescription$(): Observable<string> {
    return this.appState.getDescription$();
  }

  getProblemText$(): Observable<string> {
    return  this.appState.getProblemText$();
  }

  getProblemText(): string {
    return this.appState.getProblemText();
  }

  getInputDisabled$(): Observable<boolean> {
    return this.appState.getInputDisabled$();
  }

  getIsTaskPage$(): Observable<boolean> {
    return this.appState.getIsTaskPage$();
  }

  setHeader(header: string): void {
    // const h = header;
    this.appState.setHeader(header);
  }

  setDescription(description: string) {
    this.appState.setDescription(description);
  }

  setProblemText(problemText: string) {
    this.appState.setProblemText(problemText);
  }

  setInputDisabled(inputDisabled: boolean) {
    this.appState.setInputDisabled(inputDisabled);
  }

  setIsTaskPage(task: boolean) {
    this.appState.setIsTaskPage(task);
  }

  getTrainerByName(name: string): Trainer {
    return this.appState.getTrainersArray().find((v) => v.name === name);
  }

  mkHeadersView(name: string): void {
    const T: Trainer = this.getTrainerByName(name);
    this.setHeader(T.header);
    this.setDescription(T.description);
    this.setInputDisabled(false);
    this.appState.setCurrentTrain(name);
  }
}
