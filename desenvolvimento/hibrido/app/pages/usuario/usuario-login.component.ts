import { Component }  from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';

import { NavController, MenuController, NavParams, ViewController, Events, Loading } from 'ionic-angular';

import { FirebaseAuthService } from '../../providers/auth';
import { PostValidator, GlobalMethodService } from '../shared';
import { PrincipalPage } from '../principal';

@Component({
  templateUrl: 'build/pages/usuario/usuario-login.component.html'
})
export class UsuarioLoginPage {

  titulo: string = "Login";

  loginForm: ControlGroup;
  formError: { [id: string]: string };
  private _validationMessages: { [id: string]: { [id: string]: string } };

  mensagenErro: any;

  constructor(
    private _navParams: NavParams,
    private _navCtrl: NavController,
    private _menu: MenuController,
    private _viewCtrl: ViewController,
    private _formBuilder: FormBuilder,
    private _events: Events,
    private _globalMethod: GlobalMethodService,
    private _auth: FirebaseAuthService) {
  }

  ionViewLoaded() {
    this.gerenciarFormulario();
  }

  ionViewDidEnter() {
    this._menu.enable(false);
  }

  ionViewDidLeave() {
    this._menu.enable(true);
    this.dismiss();
  }

  login(credentials, event) {
    if (this.loginForm.dirty && this.loginForm.valid) {
      event.preventDefault();
      this._auth.login(credentials)
            .then(authData => {
              this.carregarTelaPrincipal()
            }).catch(this.handleError);
    }
  }

  criarConta(credentials, event) {
    if (this.loginForm.dirty && this.loginForm.valid) {
      event.preventDefault();
      this._auth.createUser(credentials)
            .then(authData => {
              this.carregarTelaPrincipal()
            })
            .catch(this.handleError);
    }
  }

  pular() {
    this._auth.signInWithAnonymous()
          .then(authData => {
            this.carregarTelaPrincipal()
          })
          .catch(this.handleError);
  }

  loginFacebook(): void {
    this._auth.signInWithFacebook()
          .then(authData => {
            this.carregarTelaPrincipal()
          })
          .catch(this.handleError);
  }

  loginTwitter(): void {
    this._auth.signInWithTwitter()
          .then(authData => {
            this.carregarTelaPrincipal()
          })
          .catch(this.handleError);
  }

  loginGoogle(): void {
    this._auth.signInWithGoogle()
          .then(authData => {
            this.carregarTelaPrincipal()
          })
          .catch(this.handleError);
  }

  loginGithub(): void {
    this._auth.signInWithGithub()
          .then(authData => {
            this.carregarTelaPrincipal()
          })
          .catch(this.handleError);
  }

  private carregarTelaPrincipal() {
    this._navCtrl.push(PrincipalPage);
  }

  private gerenciarFormulario(): void {
    this.formError = {
      'email': '',
      'password': ''
    };

    this._validationMessages = {
      'email': {
        'required': 'E-mail é um campo obrigatório.',
        'invalidEmail': 'Endereço de E-mail inválido.'
      },
      'password': {
        'required': 'Senha é um campo obrigatório',
        'minlength': 'A Senha deve ter no mínimo 5 caracteres.',
        'maxlength': 'A Senha deve ter no máximo 30 caracteres.'
      }
    };

    this.loginForm = this._formBuilder.group({
      'email': [
        '', Validators.compose([Validators.required, PostValidator.mailFormat])
      ],
      'password': [
        '', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])
      ]
    });

    this.loginForm.valueChanges
          .map(value => { return value; })
          .subscribe(data => this.onValueChanged(data));
  }

  private onValueChanged(data: any) {
    this._globalMethod.onValueChanged(this.loginForm, data, this.formError, this._validationMessages);
  }

  private dismiss() {
    this._viewCtrl.dismiss();
  }

  private handleError(error: any) {
      this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }
}
