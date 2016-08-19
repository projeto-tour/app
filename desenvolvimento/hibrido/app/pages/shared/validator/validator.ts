import { Control } from "@angular/common";

interface ValidationResult {
    [key: string]: boolean;
}

export class PostValidator {

    constructor() {  }

    static mailFormat(control: Control): ValidationResult {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        console.log('mailformat:' + control.value + ' -' + control.value.length + ' - ' + EMAIL_REGEXP.test(control.value));
        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { "invalidEmail": true };
        }
        return null;
    }

}