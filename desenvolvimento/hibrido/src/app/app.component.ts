import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform, AlertController } from 'ionic-angular';
// import { Splashscreen, StatusBar } from 'ionic-native';

// Services
import { FirebaseAuthService } from '../providers/auth/firebase-auth.service';
import { MenuDataService } from '../providers/data/menu-data.service';
import { GlobalMethodService } from '../providers/global/global-method.service';

// Views
import { PrincipalPage } from '../pages/principal';
import { UsuarioLoginPage } from '../pages/usuario';

// Shared
import {
  IMenu,
  IMenuItem,
  Usuario
} from '../pages/shared';

@Component({
  selector: 'partiu-app',
  templateUrl: 'app.component.html'
})
export class PartiuApp {

  @ViewChild(Nav) nav: Nav;

  usuario: Usuario = new Usuario({ displayName: 'Nome de usuário', email: 'usuario@usuario.com.br', photoURL: 'assets/img/user-woman.svg' });

  rootPage: any = null;
  menuPages: IMenu[];
  showPage: boolean = false;

  mensagenErro: any = null;

  constructor(
    public _events: Events,
    public _platform: Platform,
    public _menu: MenuController,
    public _globalMethod: GlobalMethodService,
    public _auth: FirebaseAuthService,
    public _menuData: MenuDataService,
    public _alertCtrl: AlertController) {

    this._platform.ready().then(() => {
      // StatusBar.styleDefault();
      // Splashscreen.hide();
    });

    this.menuPages = this._menuData.getMenuPages();

    this._auth.authGuard()
      .subscribe((authenticated: boolean) => { // -- on sucess
        if (authenticated) {
          this.rootPage = PrincipalPage;
        } else {
          this.rootPage = UsuarioLoginPage;
        }
      },
      error => { // -- on error
        console.log('authGuard:[Error] ' + error);
      },
      () => { // -- on completion
        this.showPage = true;
      });
  }

  openPage(page: IMenuItem) {
    if (page.title.indexOf('Logout') !== -1) {
      this.confirmarLogout();
    } else {
      this.nav.push(page.component, { title: page.title });
    }
  }

  confirmarLogout() {
    let confirm = this._alertCtrl.create({
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
    confirm.present();
  }

  private logout(): void {
    this._auth.signOut();
    window.location.reload();
  }

}
