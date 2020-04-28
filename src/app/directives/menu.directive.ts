import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appMenu]'
})
export class MenuDirective {
  constructor(private el: ElementRef, private r: Renderer2) {
  }

  @HostListener('mouseover', ['$event.target']) onMouseOver(event: Event) {
    // this.r.setStyle(this.el.nativeElement, 'color', '#0056b3');
    this.r.setStyle(this.el.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseout') onMouseOut() {
    // this.r.setStyle(this.el.nativeElement, 'color', '#007bff');
    this.r.setStyle(this.el.nativeElement, 'cursor', 'default');
  }
}
