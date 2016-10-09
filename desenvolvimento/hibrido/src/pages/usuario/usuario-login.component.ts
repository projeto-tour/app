import { Component }  from '@angular/core';

import { NavController, MenuController, ViewController } from 'ionic-angular';

import { FirebaseAuthService } from '../../providers/auth/firebase-auth.service';
import { GlobalMethodService } from '../../providers/global/global-method.service';

// import { PrincipalPage } from '../principal';

@Component({
  selector: 'page-usuario-login',
  templateUrl: 'usuario-login.component.html'
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
          if (this._auth.authenticated) {
            return this._globalMethod.mostrarMensagem('Login efetuado com sucesso.', this._navCtrl);
          } else {
            return this._globalMethod.mostrarMensagem('E-mail ou senha inválido.', this._navCtrl);
          }
        }).then(() => {
          if (this._auth.authenticated) {
            this.carregarTelaPrincipal();
          }
        }).catch(error => {
          this.handleError(error);
        });
    } else {
      this._globalMethod.mostrarMensagem('E-mail ou senha inválido.', this._navCtrl);
    }
  }

  onCreateAccount(form) {
    this.submitted = true;
    if (form.valid) {
      event.preventDefault();
      this._auth.createUser(this.credentials)
        .then(authData => {
          if (this._auth.authenticated) {
            return this._globalMethod.mostrarMensagem('Conta criado com sucesso.', this._navCtrl);
          } else {
            return this._globalMethod.mostrarMensagem('E-mail ou senha inválido.', this._navCtrl);
          }
        }).then(() => {
          if (this._auth.authenticated) {
            this.carregarTelaPrincipal();
          }
        }).catch(error => {
          this.handleError(error);
        });
    } else {
      this._globalMethod.mostrarMensagem('E-mail ou senha inválido.', this._navCtrl);
    }
  }

  onLoginAnonymous() {
    this._auth.signInWithAnonymous()
      .then(authData => {
        if (this._auth.authenticated) {
          return this._globalMethod.mostrarMensagem('Login efetuado com sucesso.', this._navCtrl);
        } else {
          return this._globalMethod.mostrarMensagem('E-mail ou senha inválido.', this._navCtrl);
        }
      }).then(() => {
        if (this._auth.authenticated) {
          this.carregarTelaPrincipal();
        }
      }).catch(error => {
        this.handleError(error);
      });
  }

  onLoginFacebook(): void {
    this._auth.signInWithFacebook()
      .then(authData => {
        if (this._auth.authenticated) {
          return this._globalMethod.mostrarMensagem('Login efetuado com sucesso.', this._navCtrl);
        } else {
          return this._globalMethod.mostrarMensagem('E-mail ou senha inválido.', this._navCtrl);
        }
      }).then(() => {
        if (this._auth.authenticated) {
          this.carregarTelaPrincipal();
        }
      }).catch(error => {
        this.handleError(error);
      });
  }

  onLoginTwitter(): void {
    this._auth.signInWithTwitter()
      .then(authData => {
        if (this._auth.authenticated) {
          return this._globalMethod.mostrarMensagem('Login efetuado com sucesso.', this._navCtrl);
        } else {
          return this._globalMethod.mostrarMensagem('E-mail ou senha inválido.', this._navCtrl);
        }
      }).then(() => {
        if (this._auth.authenticated) {
          this.carregarTelaPrincipal();
        }
      }).catch(error => {
        this.handleError(error);
      });
  }

  onLoginGoogle(): void {
    this._auth.signInWithGoogle()
      .then(authData => {
        if (this._auth.authenticated) {
          return this._globalMethod.mostrarMensagem('Login efetuado com sucesso.', this._navCtrl);
        } else {
          return this._globalMethod.mostrarMensagem('E-mail ou senha inválido.', this._navCtrl);
        }
      }).then(() => {
        if (this._auth.authenticated) {
          this.carregarTelaPrincipal();
        }
      }).catch(error => {
        this.handleError(error);
      });
  }

  onLoginGithub(): void {
    this._auth.signInWithGithub()
      .then(authData => {
        if (this._auth.authenticated) {
          return this._globalMethod.mostrarMensagem('Login efetuado com sucesso.', this._navCtrl);
        } else {
          return this._globalMethod.mostrarMensagem('E-mail ou senha inválido.', this._navCtrl);
        }
      }).then(() => {
        if (this._auth.authenticated) {
          this.carregarTelaPrincipal();
        }
      }).catch(error => {
        this.handleError(error);
      });
  }

  private carregarTelaPrincipal() {
    this.dismiss();
    window.location.reload();
    // this._navCtrl.push(PrincipalPage);
  }

  private dismiss() {
    this._viewCtrl.dismiss();
  }

  private handleError(error: any) {
    console.log(JSON.stringify(error));
    // this._globalMethod.mostrarErro(<any>error, this._navCtrl);
    this._globalMethod.mostrarMensagem('Não foi possível realizar login. Por favor, verifique a sua conta e tente novamente.', this._navCtrl);
  }

}
