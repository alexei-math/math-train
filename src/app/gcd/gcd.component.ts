import { Component, OnInit } from '@angular/core';
import {ScoreData, ViewData} from '../modules/iface.module';


@Component({
  selector: 'app-gcd',
  templateUrl: './gcd.component.html',
  styleUrls: ['./gcd.component.css']
})


export class GcdComponent implements OnInit {

  viewData: ViewData;
  scoreGCDData: ScoreData = {
    totalProblems: 10,
    givenProblems: 0,
    solvedProblems: 0
  };

  constructor() { }

  ngOnInit(): void {
    this.viewData = {
      header: 'Наибольший общий делитель',
      description: '',
      problemText: '12 \\, \\, и \\, \\, 8',
      inputDisabled: false
    };
    this.scoreGCDData.givenProblems = 7;
    this.scoreGCDData.solvedProblems = 6;
  }

}
