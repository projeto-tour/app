import { Directive, Provider, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, Control } from '@angular/common';

const PARTIU_EMAIL_VALIDATOR = new Provider(NG_VALIDATORS, { useExisting: forwardRef(() => EmailValidatorDirective), multi: true });

@Directive({
    selector: '[partiu-email-validator]',
    providers: [PARTIU_EMAIL_VALIDATOR]
})
export class EmailValidatorDirective implements Validator {

    constructor() { }

    validate(c: Control): { [key: string]: any } {
        var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailReg.test(c.value) ? null : { 'emailValidation': 'email is invalid.' };
    }
}
