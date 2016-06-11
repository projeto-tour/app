import { Component }  from '@angular/core';

import { App, NavParams, NavController, ViewController } from 'ionic-angular';

import { UsuarioView, UsuarioService } from './';

import { UserDataProvider } from '../../providers/user-data.provider';

import { GlobalMethodService } from '../shared';

@Component({
  templateUrl: 'build/pages/usuario/usuario-profile.component.html',
  providers: [UserDataProvider]
})
export class UsuarioProfilePage {

  titulo: string = "Perfil";
  usuario: UsuarioView;
  dados: any;
  mensagenErro: any;

  constructor(private _navParams: NavParams,
    private _navCtrl: NavController,
    private _viewCtrl: ViewController,
    private _userData: UserDataProvider,
    private _service: UsuarioService,
    private _globalMethod: GlobalMethodService) {
    this.dados = this._navParams.data;
  }

  ionViewLoaded() {
    this.getUsuario();
  }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  salvar() {
    this._userData.setUsuario(this.usuario).then(
      (data: boolean) => data ? this.dismiss() : this._globalMethod.mostrarErro(this.mensagenErro = 'Falha na execução desta operação', this._navCtrl),
      error => this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl));

  }

  dismiss() {
    this._viewCtrl.dismiss(this.dados);
  }

  private getUsuario() {
    this._userData.getUsuario().then(
      (data: UsuarioView) => this.usuario = data,
      error => this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl));
  }
}
