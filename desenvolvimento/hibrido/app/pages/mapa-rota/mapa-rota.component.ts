import { Component }  from '@angular/core';

import { NavParams, NavController } from 'ionic-angular';

import { GlobalMethodService } from '../shared';

import { PreferenciaPage } from '../preferencia';

@Component({
  templateUrl: 'build/pages/mapa-rota/mapa-rota.component.html'
})
export class MapaRotaPage {

  titulo: string = 'Mapa';
  pontosMapa: any;
  pontoInteresse: string = '1';
  mapa: any;
  dados: any;
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _globalMethod: GlobalMethodService) {
    this.dados = this._navParams.data;
  }

  ionViewLoaded() { }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

}
