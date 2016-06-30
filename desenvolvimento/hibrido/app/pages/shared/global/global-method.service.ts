import { Injectable } from '@angular/core';

import { NavController, Toast, Modal } from 'ionic-angular';

@Injectable()
export class GlobalMethodService {

    constructor() { }

    mostrarErro(error: any, navCtrl: NavController) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Houve falha na execução desta operação. Por favor, tente novamente mais tarde.';
        console.log('mostrarErro: ' + errMsg);
        let toast = Toast.create({
            message: errMsg,
            duration: 3000
        });
        navCtrl.present(toast);
    }

    mostrarMensagem(msg: any, navCtrl: NavController) {
        let toast = Toast.create({
            message: msg,
            duration: 3000
        });
        navCtrl.present(toast);
    }
    
    carregarPagina(pagina, dados, isPush: boolean, navCtrl: NavController) {
        if (isPush) {
            navCtrl.push(pagina, dados);
        } else {
            let modal = Modal.create(pagina, { dados: dados });
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

}