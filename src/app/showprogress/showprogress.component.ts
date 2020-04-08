import {Component, Input, OnInit} from '@angular/core';
import {ScoreData} from '../modules/modules';

@Component({
  selector: 'app-showprogress',
  templateUrl: './showprogress.component.html',
  styleUrls: ['./showprogress.component.css']
})
export class ShowprogressComponent implements OnInit {

  @Input() scoreData: ScoreData;

  constructor() { }

  ngOnInit(): void {
  }

  setPercentGivenProblems() {
    return this.scoreData.givenProblems / this.scoreData.totalProblems * 100;
  }

  setPercentSolvedProblems() {
    if (!this.scoreData.givenProblems) {
      return 0;
    } else {
      return this.scoreData.solvedProblems / this.scoreData.givenProblems * 100;
    }
  }

  setPercentSolvedFromTotalProblems() {
    return this.scoreData.solvedProblems / this.scoreData.totalProblems * 100;
  }

  setColorRightSolvedFromTotalProgress() {
    if (this.setPercentSolvedFromTotalProblems() > 90) {
      return 'success';
    } else if (this.setPercentSolvedFromTotalProblems() > 75) {
      return 'info';
    } else  if (this.setPercentSolvedFromTotalProblems() > 60) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  setColorPercentRightAnswer() {
    if (this.setPercentSolvedProblems() > 90) {
      return 'green';
    } else if (this.setPercentSolvedProblems() > 75) {
      return 'blue';
    } else if (this.setPercentSolvedProblems() > 60) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  setColorSuccessProgress() {
    if (this.setPercentSolvedProblems() > 90) {
      return 'success';
    } else if (this.setPercentSolvedProblems() > 75) {
      return 'info';
    } else  if (this.setPercentSolvedProblems() > 60) {
      return 'warning';
    } else {
      return 'danger';
    }
  }
}
