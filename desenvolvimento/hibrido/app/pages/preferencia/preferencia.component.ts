import { Component }  from '@angular/core';

import { App, NavParams, ViewController, NavController, Platform } from 'ionic-angular';

import {
  GlobalMethodService,
  ITipoPontoInteresse,
  IPreferenciaUsuario
} from '../shared';
import { PreferenciaUsuarioService } from '../../providers/data/preferencia-usuario.service';
import { TipoPontoInteresseService } from '../../providers/data/tipo-ponto-interesse.service';

@Component({
  templateUrl: 'build/pages/preferencia/preferencia.component.html'
})
export class PreferenciaPage {

  titulo: string = 'Prefêrencias';
  preferncias: ITipoPontoInteresse[] = [];
  dados: any;
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController,
    public _navCtrl: NavController,
    public _preferenciaUsuarioService: PreferenciaUsuarioService,
    public _tipoPontoInteresseService: TipoPontoInteresseService,
    public _globalMethod: GlobalMethodService) {
    this.dados = _navParams.data;
    _tipoPontoInteresseService.tipos.subscribe(data => {
      this.preferncias = data;
    });
  }

  ionViewLoaded() { }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  confirmar() {
    this.dismiss();
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }

}
