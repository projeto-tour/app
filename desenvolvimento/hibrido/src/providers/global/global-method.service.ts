import { Injectable } from '@angular/core';

import { NavController, ToastController, ModalController } from 'ionic-angular';

@Injectable()
export class GlobalMethodService {

  constructor(
    public _toastCtrl: ToastController,
    public _modalCtrl: ModalController) { }

  mostrarErro(error: any, navCtrl: NavController) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Houve falha na execução desta operação. Por favor, tente novamente mais tarde.';
    console.log('mostrarErro: ' + errMsg);
    let toast = this._toastCtrl.create({
      message: errMsg,
      duration: 3000
    });
    toast.present();
  }

  mostrarMensagem(msg: any, navCtrl: NavController) {
    let toast = this._toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  carregarPagina(pagina, dados, isPush: boolean, navCtrl: NavController) {
    if (isPush) {
      navCtrl.push(pagina, dados);
    } else {
      let modal = this._modalCtrl.create(pagina, { dados: dados });
      modal.present();
      modal.onDidDismiss((data: any) => {
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
