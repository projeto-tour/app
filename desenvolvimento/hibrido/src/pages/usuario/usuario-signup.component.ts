import { Component }  from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { UsuarioView } from './';

@Component({
  selector: 'page-usuario-signup',
  templateUrl: 'usuario-signup.component.html',
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
