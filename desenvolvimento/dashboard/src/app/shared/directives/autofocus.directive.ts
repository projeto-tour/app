import { Directive, ElementRef, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class Autofocus implements AfterViewChecked {

  constructor(private _element: ElementRef) {
  }

  ngAfterViewChecked() {
    this._element.nativeElement.focus();
  }

}
