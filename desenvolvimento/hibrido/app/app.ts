import 'es6-shim';

import { Component, ViewChild } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { ionicBootstrap, Events, Platform, Nav, MenuController, Modal, Alert } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Menu, MenuItem, GlobalMethodService, GlobalVariableService } from './pages/shared';
import { UserDataProvider, MenuDataProvider, TutorialDataProvider, FirebaseDataProvider } from './providers';

import { PrincipalPage } from './pages/principal';
import { PreferenciaService } from './pages/preferencia';
import { AgendaService } from './pages/agenda';
import { UsuarioView, UsuarioService, UsuarioLoginPage } from './pages/usuario';
import { HistoricoService } from './pages/historico';
import { NotificacaoService } from './pages/notificacao';
import { RotaService } from './pages/rota';
import { MapaService } from './pages/mapa';

@Component({
  templateUrl: 'build/app.html'
})
class PartiuApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = null;
  menuPages: Menu[];
  showPage: boolean = false;
  usuario: UsuarioView;
  hasLoggedIn: boolean = false;
  mensagenErro: any = null;

  constructor(private _events: Events,
    private _userData: UserDataProvider,
    private _menuData: MenuDataProvider,
    private _platform: Platform,
    private _menu: MenuController,
    private _globalMethod: GlobalMethodService) {
    this._platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.menuPages = this._menuData.getMenuPages();

    this.listenToLoginEvents();

    this._userData.hasLoggedIn().then((data: boolean) => {
      this.hasLoggedIn = data;
      if (this.hasLoggedIn) {
        this._events.publish('usuario:initApp');
        this.getUsuario();
        this.rootPage = PrincipalPage;
      } else {
        this.rootPage = UsuarioLoginPage;
      }
    });
  }

  ionViewLoaded() { }

  ionViewWillEnter() { }

  ionViewDidEnter() { 
    this.enableMenu(this.hasLoggedIn);
  }
  
  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  openPage(page: MenuItem) {
    if (page.title.indexOf("Logout") !== -1) {
      this.confirmarLogout();
    } else {
      this.nav.push(page.component, { usuario: this.usuario, title: page.title });
    }
  }

  confirmarLogout() {
    let confirm = Alert.create({
      title: 'Logout',
      message: 'Deseja realmente realizar logout?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Não clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    this.nav.present(confirm);
  }

  listenToLoginEvents() {
    this._events.subscribe('usuario:initApp', () => {
      this.showPage = true;
    });

    this._events.subscribe('usuario:login', () => {
      this.enableMenu(true);
    });

    this._events.subscribe('usuario:signup', () => {
      this.enableMenu(true);
    });

    this._events.subscribe('usuario:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this._menu.enable(loggedIn, 'loggedInMenu');
    this._menu.enable(!loggedIn, 'loggedOutMenu');
  }

  private getUsuario() {
    this._userData.getUsuario().then(
      (data: UsuarioView) => this.usuario = data,
      error => this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this.nav));
  }

  private logout(): void {
    setTimeout(() => {
      this._userData.logout();
    }, 1000);
  }

}

ionicBootstrap
  (
  //-- Root Component
  PartiuApp,
  //-- Providers           
  [
    UserDataProvider,
    MenuDataProvider,
    TutorialDataProvider,
    FirebaseDataProvider,
    PreferenciaService,
    AgendaService,
    UsuarioService,
    HistoricoService,
    NotificacaoService,
    RotaService,
    MapaService,
    GlobalMethodService,
    GlobalVariableService,
    HTTP_PROVIDERS
  ],
  //-- Config
  {
    prodMode: false,
    backButtonText: 'Voltar',
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Juno', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthShortNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'],
    dayShortNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  }
  );