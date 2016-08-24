import { Component }  from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { UsuarioView } from './';

@Component({
  templateUrl: 'build/pages/usuario/usuario-signup.component.html',
})
export class UsuarioSignUpPage {

  titulo: string = 'Login';
  dados: any;
  usuario: UsuarioView = new UsuarioView();
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController) {
    this.dados = this._navParams.data;
  }

  ionViewLoaded() { }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  login() {
    this.dismiss();
  }

  criarConta() {
    this.dismiss();
  }

  dismiss(): void {
    this._viewCtrl.dismiss(this.titulo);
  }

}
