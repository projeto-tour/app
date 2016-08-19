import { Component }  from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/desenvolvimento/desenvolvimento.component.html'
})
export class DesenvolvimentoPage {

  titulo: string = "Partiu!";
  dados: any;

  private mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController) {
    this.dados = _navParams.data;
    this.titulo = this.dados.title.length === 0 ? this.titulo : this.dados.title;
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
