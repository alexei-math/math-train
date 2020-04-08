import {Component, Input, OnInit} from '@angular/core';
import {KatexOptions} from 'ng-katex';
import {ViewData} from '../modules/modules';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  @Input() viewData: ViewData

  options: KatexOptions = {
    displayMode: true,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
