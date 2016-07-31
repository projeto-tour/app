import { Directive, ElementRef, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements AfterViewChecked {

  constructor(private _element: ElementRef) {
  }

  ngAfterViewChecked() {
    this._element.nativeElement.focus();
  }

}
