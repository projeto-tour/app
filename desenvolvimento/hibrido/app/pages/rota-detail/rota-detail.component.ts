import { Component }  from '@angular/core';
import { NavParams, ViewController, NavController } from 'ionic-angular';

import { RotaView } from '../rota';

import { MapaPage } from '../mapa';

@Component({
  templateUrl: 'build/pages/rota-detail/rota-detail.component.html'
})
export class RotaDetailPage {

  titulo: string = "Detalhes";
  rota: RotaView;

  private mensagenErro: any;

  constructor(private _navParams: NavParams,
    private _viewCtrl: ViewController,
    private _navCtrl: NavController) {
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
    this._navCtrl.push(MapaPage, this.rota);
  }

  private dismiss() {
    this._viewCtrl.dismiss();
  }

}
