import { Component }  from '@angular/core';

import { App, NavParams, ViewController, NavController, Platform } from 'ionic-angular';

import { GlobalMethodService } from '../shared';

import { Preferencia, PreferenciaService } from './';

@Component({
  templateUrl: 'build/pages/preferencia/preferencia.component.html'
})
export class PreferenciaPage {

  titulo: string = "Prefêrencias";
  isAndroid: boolean = false;
  dados: any;
  preferencia: Preferencia = null;
  preferencias: Array<Preferencia> = [];
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController,
    public _navCtrl: NavController,
    public _service: PreferenciaService,
    public _platform: Platform,
    public _globalMethod: GlobalMethodService) {
    this.isAndroid = _platform.is('android');
    this.dados = _navParams.data;
  }

  ionViewLoaded() {
    this.getPontosDeInteresse();
  }

  ionViewWillEnter() { }

  ionViewDidEnter() { 
    this.preferencia = this.preferencias[0];
  }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  carregarPreferencia(preferencia: Preferencia): void {
    this.preferencia = preferencia;
  }

  confirmar() {
    this.dismiss();
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }

  private getPontosDeInteresse() {
    this._service.getPreferencias()
      .subscribe(
      (data: Preferencia[]) => { //-- on sucess
        this.preferencias = data;
      },
      error => { //-- on error
        this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
      },
      () => { //-- on completion

      }
      );
  }
}
