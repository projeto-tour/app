import { Injectable } from '@angular/core';

import { NavController, Toast, Modal } from 'ionic-angular';

@Injectable()
export class GlobalMethodService {

    constructor() { }

    mostrarErro(erro: any, navCtrl: NavController) {
        let toast = Toast.create({
        message: erro,
        duration: 3000
        });
        navCtrl.present(toast);
    }
  
    carregarPagina(pagina, dados, isPush: boolean, navCtrl: NavController) {
        if (isPush) {
            navCtrl.push(pagina, dados);
        } else {
            let modal = Modal.create(pagina, {dados: dados});
            navCtrl.present(modal);
            modal.onDismiss(data => {
                if (data) {
                    console.log('onDismiss: ' + JSON.stringify(data));
                }
            });
        }
    }

    convertToDate(dateString: string): Date {
        return new Date(dateString);
    }
    
    onValueChanged(form: any, data: any, formError: any, validationMessages: any) {
        for (let field in formError) {
            if (formError.hasOwnProperty(field)) {
                let hasError = form.controls[field].dirty &&
                    !form.controls[field].valid;
                formError[field] = '';
                if (hasError) {
                    for (let key in form.controls[field].errors) {
                        if (form.controls[field].errors.hasOwnProperty(key)) {
                            formError[field] += validationMessages[field][key] + ' ';
                        }
                    }
                }
            }
        }
    }
    
    createUUID() {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }
}