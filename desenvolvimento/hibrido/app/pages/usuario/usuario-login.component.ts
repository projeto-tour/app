import { Component }  from '@angular/core';

import { NavController, MenuController, ViewController } from 'ionic-angular';

import { FirebaseAuthService } from '../../providers/auth';
import { GlobalMethodService } from '../shared';
import { PrincipalPage } from '../principal';

@Component({
  templateUrl: 'build/pages/usuario/usuario-login.component.html'
})
export class UsuarioLoginPage {

  titulo: string = 'Login';

  credentials: { email?: string, password?: string } = {};
  submitted = false;

  mensagenErro: any;

  constructor(
    public _navCtrl: NavController,
    public _menuCtrl: MenuController,
    public _viewCtrl: ViewController,
    public _globalMethod: GlobalMethodService,
    public _auth: FirebaseAuthService) {
  }

  ionViewDidEnter() {
    this._menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this._menuCtrl.enable(true);
    this.dismiss();
  }

  onLogin(form) {
    this.submitted = true;
    if (form.valid) {
      event.preventDefault();
      this._auth.login(this.credentials)
        .then(authData => {
          this.carregarTelaPrincipal();
        }).catch(this.handleError);
    }
  }

  onCreateAccount(form) {
    this.submitted = true;
    if (form.valid) {
      event.preventDefault();
      this._auth.createUser(this.credentials)
        .then(authData => {
          this.carregarTelaPrincipal();
        })
        .catch(this.handleError);
    }
  }

  onLoginAnonymous() {
    this._auth.signInWithAnonymous()
      .then(authData => {
        this.carregarTelaPrincipal();
      })
      .catch(this.handleError);
  }

  onLoginFacebook(): void {
    this._auth.signInWithFacebook()
      .then(authData => {
        this.carregarTelaPrincipal();
      })
      .catch(this.handleError);
  }

  onLoginTwitter(): void {
    this._auth.signInWithTwitter()
      .then(authData => {
        this.carregarTelaPrincipal();
      })
      .catch(this.handleError);
  }

  onLoginGoogle(): void {
    this._auth.signInWithGoogle()
      .then(authData => {
        this.carregarTelaPrincipal();
      })
      .catch(this.handleError);
  }

  onLoginGithub(): void {
    this._auth.signInWithGithub()
      .then(authData => {
        this.carregarTelaPrincipal();
      })
      .catch(this.handleError);
  }

  private carregarTelaPrincipal() {
    this._navCtrl.push(PrincipalPage);
  }

  private dismiss() {
    this._viewCtrl.dismiss();
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }
}
