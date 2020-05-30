import { Component, OnInit } from '@angular/core';
import {TimerTaskService} from '../services/timer-task.service';
import {AppFacade} from '../app.facade';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  isTaskPage: boolean;

  constructor(
    public timeTask: TimerTaskService,
    private appFacade: AppFacade
  ) {}

  ngOnInit(): void {
    this.appFacade.getIsTaskPage$()
      .subscribe(isTask => {
        this.isTaskPage = isTask;
      });
  }

  logout() {
    this.appFacade.logout();
  }
}
