import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class Autofocus {

  constructor(private _element: ElementRef) {
    _element.nativeElement.focus();
  }

}
