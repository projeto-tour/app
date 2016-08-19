import { Component }  from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Agenda } from '../../providers/agendas';
import { Rota } from '../shared';

@Component({
  templateUrl: 'build/pages/rota-detail/rota-create.component.html'
})
export class RotaCreatePage {

  titulo: string = "Nova Rota";
  rota: Rota;
  agenda: Agenda;

  private mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController) {
    this.rota = new Rota(null, null, null, null, "", "", "", "")
    this.agenda = this._navParams.data;
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
    this._viewCtrl.dismiss();
  }

}
