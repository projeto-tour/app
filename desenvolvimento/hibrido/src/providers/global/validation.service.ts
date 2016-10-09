import { FormControl } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export class ValidationService {

  constructor() { }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'invalidEmailAddress': 'E-mail inválido.',
      'invalidPassword': 'Senha inválida.',
      'required': 'Campo obrigatório.',
      'minlength': `Campo requer tamanho mínimo de ${validatorValue.requiredLength} caracteres.`,
      'maxlength': `Campo requer tamanho máximo de ${validatorValue.maxlength} caracteres.`
    };

    return config[validatorName];
  }

  static emailValidator(control: FormControl): ValidationResult {
    // RFC 2822 compliant regex
    var EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    console.log('mailformat:' + control.value + ' -' + control.value.length + ' - ' + EMAIL_REGEXP.test(control.value));
    if (control.value !== '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return { 'invalidEmailAddress': true };
    }
    return null;
  }

  static passwordValidator(control: FormControl) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

}
