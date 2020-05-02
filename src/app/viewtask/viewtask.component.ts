import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KatexOptions} from 'ng-katex';
import {ViewData} from '../modules/iface.module';
import {AppFacade} from '../app.facade';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

//  @Input() viewData: ViewData;
  @Output() onInpDis: EventEmitter<boolean> = new EventEmitter<boolean>();

  subs: Subscription;
  header = '';
  description = '';
  inputDisabled = false;
  problemText = '';

  options: KatexOptions = {
    displayMode: true,
  };
  constructor(private appFacade: AppFacade) { }

  ngOnInit(): void {
    this.appFacade.getHeader$().subscribe(
      (header) => {
        this.header = header;
      }
    );
    this.appFacade.getDescription$().subscribe(
        (description) => {
          this.description = description;
      }
    );
    this.appFacade.getInputDisabled$().subscribe(
      (inputDisabled) => {
        this.inputDisabled = inputDisabled;
        this.onInpDis.emit(inputDisabled);
      }
    );
    this.appFacade.getProblemText$().subscribe(
      (problemText) => {
        this.problemText = problemText;
      }
    );
  }

}
