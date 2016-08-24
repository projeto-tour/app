import { Component }  from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/compartilhar/compartilhar.component.html',
})
export class CompartilharPage {

  titulo: string = 'Compartilhar';
  dados: any;

  private mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController) {
    this.dados = _navParams.data;
  }

  ionViewLoaded() { }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

}
