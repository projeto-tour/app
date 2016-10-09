import { Directive } from '@angular/core';
import { Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[partiu-email-validator]'
})
export class EmailValidatorDirective implements Validator {

  constructor() { }

  validate(c: FormControl): { [key: string]: any } {
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailReg.test(c.value) ? null : { 'emailValidation': 'email is invalid.' };
  }

}
