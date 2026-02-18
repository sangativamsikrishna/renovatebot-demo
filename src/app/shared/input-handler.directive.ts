import { Directive, ElementRef, OnInit, OnChanges, Renderer2, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputHandler]'
})
export class InputHandlerDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.stateManager();
  }

  @HostListener('input')
  onInput() {
    this.stateManager();
  }

  private stateManager() {
    if (this.el.nativeElement.value !== '' && this.el.nativeElement.value !== 0) {
      this.renderer.addClass(this.el.nativeElement, 'data-valid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'data-valid');
    }
  }
}
