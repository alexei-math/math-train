import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef} from '@angular/core';


@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  constructor(public el: ElementRef) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }
}
