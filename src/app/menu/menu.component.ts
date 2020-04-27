import { Component, OnInit } from '@angular/core';
import {TimerTaskService} from '../services/timer-task.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  constructor(protected timeTask: TimerTaskService) { }

  ngOnInit(): void {
  }
}
