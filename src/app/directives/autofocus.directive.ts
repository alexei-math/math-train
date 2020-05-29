import {AfterContentInit, AfterViewInit, Directive, ElementRef} from '@angular/core';


@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective implements  AfterContentInit, AfterViewInit {
  constructor(private el: ElementRef) {
  }

  ngAfterContentInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }

}
