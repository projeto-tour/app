import { Component }  from '@angular/core';
import { NavParams, ViewController, NavController } from 'ionic-angular';

import { RotaView } from '../rota';

import { MapaPontoInteressePage } from '../mapa-ponto-interesse';

@Component({
  templateUrl: 'build/pages/rota-detail/rota-detail.component.html'
})
export class RotaDetailPage {

  titulo: string = "Detalhes";
  rota: RotaView;

  private mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController,
    public _navCtrl: NavController) {
    this.rota = _navParams.data;
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

  carregarMapa(): void {
    this._navCtrl.push(MapaPontoInteressePage, this.rota);
  }

  private dismiss() {
    this._viewCtrl.dismiss();
  }

}
