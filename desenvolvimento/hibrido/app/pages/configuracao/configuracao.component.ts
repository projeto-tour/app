import { Component }  from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/configuracao/configuracao.component.html',
})
export class ConfiguracaoPage {

  titulo: string = "Configurações";
  dados: any;
  mensagenErro: any;

  constructor(private _navParams: NavParams,
    private _viewCtrl: ViewController) {
    this.dados = this._navParams.data;
  }

  ionViewLoaded() { }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  salvar(): void {
    this.dismiss();
  }

  dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

}
