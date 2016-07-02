import 'es6-shim';

// angular core
import { Component, ViewChild } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

// RxJS Observable operators
import './pages/shared/rxjs.operators';

// Ionic Core
import { ionicBootstrap, Events, Platform, Nav, MenuController, Alert } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// Providers / Services
import { FIREBASE_APP_PROVIDERS } from './providers/firebase';
import { AUTH_PROVIDERS, FirebaseAuthService } from './providers/auth';
import { USUARIOS_PROVIDERS, Usuario } from './providers/usuarios';
import { AGENDAS_PROVIDERS } from './providers/agendas';
import { DATA_PROVIDERS, MenuDataService, IMenu, IMenuItem } from './providers/data';

// Shared
import { GlobalMethodService, GlobalVariableService } from './pages/shared';

// Services

// Views
import { PrincipalPage } from './pages/principal';
import { PreferenciaService } from './pages/preferencia';
import { UsuarioLoginPage } from './pages/usuario';
import { NotificacaoService } from './pages/notificacao';
import { RotaService } from './pages/rota';
import { MapaService } from './pages/mapa';

@Component({
  templateUrl: 'build/app.html'
})
class PartiuApp {

  @ViewChild(Nav) nav: Nav;

  usuario: Usuario = new Usuario('Nome de usuário', 'usuario@usuario.com.br', 'img/user-woman.svg');
  
  rootPage: any = null;
  menuPages: IMenu[];
  showPage: boolean = false;

  mensagenErro: any = null;

  constructor(private _events: Events,
    private _platform: Platform,
    private _menu: MenuController,
    private _globalMethod: GlobalMethodService,
    private _auth: FirebaseAuthService,
    private _menuData: MenuDataService) {
    this._platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.menuPages = this._menuData.getMenuPages();

    this._auth.authGuard()
          .subscribe((authenticated: boolean) => { //-- on sucess
            if (authenticated) {
              this.rootPage = PrincipalPage;
            } else {
              this.rootPage = UsuarioLoginPage;
            }
          },
          error => { //-- on error
            console.log('authGuard:[Error] ' +  error)
          },
          () => { //-- on completion
            this.showPage = true;
          });
  }

  openPage(page: IMenuItem) {
    if (page.title.indexOf("Logout") !== -1) {
      this.confirmarLogout();
    } else {
      this.nav.push(page.component, { title: page.title });
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

  private logout(): void {
    this._auth.signOut();
    window.location.reload();
  }

}

ionicBootstrap
  (
  //-- Root Component
  PartiuApp,
  //-- Providers           
  [
    HTTP_PROVIDERS,
    AUTH_PROVIDERS,
    FIREBASE_APP_PROVIDERS,
    USUARIOS_PROVIDERS,
    AGENDAS_PROVIDERS,
    DATA_PROVIDERS,
    PreferenciaService,
    NotificacaoService,
    RotaService,
    MapaService,
    GlobalMethodService,
    GlobalVariableService
  ],
  //-- Config
  {
    tabbarPlacement: 'bottom',
    prodMode: true,
    backButtonText: 'Voltar',
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Juno', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthShortNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'],
    dayShortNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  });