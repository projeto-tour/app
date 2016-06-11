import { Component }  from '@angular/core';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';

import { NavController, MenuController, NavParams, ViewController, Modal, Events, Loading } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { UsuarioView, UsuarioSignUpPage } from './';

import { UserDataProvider } from '../../providers/user-data.provider';
import { FirebaseDataProvider } from '../../providers/firebase-data.provider';

import { PostValidator, GlobalMethodService } from '../shared';

import { PrincipalPage } from '../principal';
import { PreferenciaPage } from '../preferencia';

@Component({
  templateUrl: 'build/pages/usuario/usuario-login.component.html',
  providers: [UserDataProvider, FirebaseDataProvider]
})
export class UsuarioLoginPage {

  titulo: string = "Login";
  usuario: UsuarioView;

  loginForm: ControlGroup;
  formError: { [id: string]: string };
  private _validationMessages: { [id: string]: { [id: string]: string } };

  items: Observable<any[]>;

  private dados: any;
  private mensagenErro: any;

  constructor(private _navParams: NavParams,
    private _navCtrl: NavController,
    private _menu: MenuController,
    private _userData: UserDataProvider,
    private _viewCtrl: ViewController,
    private _formBuilder: FormBuilder,
    private _events: Events,
    private _globalMethod: GlobalMethodService,
    private _firebaseData: FirebaseDataProvider) {
    this.dados = _navParams.data;
    this.usuario = new UsuarioView("", "");
  }

  ionViewLoaded() {
    this.gerenciarFormulario();
  }

  ionViewWillEnter() { }

  ionViewDidEnter() {
    this._menu.enable(false);
    this._events.publish('usuario:initApp');
  }

  ionViewWillLeave() { }

  ionViewDidLeave() {
    this._menu.enable(true);
    this.dismiss();
  }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this._userData.login(this.usuario);
      //-- TODO
      this.realizarLogin();
    }
  }

  criarConta() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this._userData.login(this.usuario);
      //-- TODO
      this.realizarLogin();
    }
  }

  pular() {
    //-- TODO
    this.realizarLogin();
  }

  loginFacebook(): void {
    //-- TODO
    this.realizarLogin();
  }

  loginTwitter(): void {
    //-- TODO
    this.realizarLogin();
  }

  loginGoogle(): void {
    //-- TODO
    this.realizarLogin();
  }

  loginGithub(): void {
    //-- TODO
    this.realizarLogin();
  }

  private realizarLogin() {
    let loading = Loading.create({
      content: 'Por favor, aguarde...'
    });

    this._navCtrl.present(loading);

    setTimeout(() => {
      this.carregarTelaPrincipal();
    }, 500);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  private carregarTelaPrincipal() {
    this._navCtrl.push(PrincipalPage);
  }

  private gerenciarFormulario(): void {
    this.formError = {
      'email': '',
      'senha': ''
    };

    this._validationMessages = {
      'email': {
        'required': 'E-mail é um campo obrigatório.',
        'invalidEmail': 'Endereço de E-mail inválido.'
      },
      'senha': {
        'required': 'Senha é um campo obrigatório',
        'minlength': 'A Senha deve ter no mínimo 5 caracteres.',
        'maxlength': 'A Senha deve ter no máximo 30 caracteres.'
      }
    };

    this.loginForm = this._formBuilder.group({
      'email': [
        this.usuario.email,
        Validators.compose([Validators.required, PostValidator.mailFormat])
      ],
      'senha': [
        this.usuario.senha,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])
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

}
