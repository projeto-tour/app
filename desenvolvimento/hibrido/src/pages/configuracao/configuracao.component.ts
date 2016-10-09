import { Component }  from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-configuracao',
  templateUrl: 'configuracao.component.html',
})
export class ConfiguracaoPage {

  titulo: string = 'Configurações';
  dados: any;
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController) {
    this.dados = this._navParams.data;
  }

  salvar(): void {
    this.dismiss();
  }

  dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

}
