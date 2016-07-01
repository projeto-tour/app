import { Component }  from '@angular/core';

import { NavParams, NavController, ViewController } from 'ionic-angular';

import { GlobalMethodService } from '../shared';
import { UsuarioService, Usuario, Endereco } from '../../providers/usuarios';

@Component({
  templateUrl: 'build/pages/usuario/usuario-profile.component.html'
})
export class UsuarioProfilePage {

  titulo: string = "Perfil";
  usuario: Usuario = new Usuario();

  mensagenErro: any;

  constructor(
    private _viewCtrl: ViewController,
    private _navCtrl: NavController,
    private _globalMethod: GlobalMethodService,
    public _usuarioService: UsuarioService) {
    this.getUsuario();
  }

  salvar() {
    this._usuarioService.createUsuario(this.setUsuario())
      .then(data => {
        this._globalMethod.mostrarMensagem('Dados de usuário foram atualizados com êxito.', this._navCtrl);
        this.dismiss()
      })
      .catch(this.handleError);
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }

  private getUsuario() {
    this._usuarioService.usuario
      .subscribe(
      (data: Usuario) => { //-- on sucess
        if (data) {
          this.usuario = data;
          this.usuario.endereco = data.endereco ? data.endereco : new Endereco();
        }
      },
      error => { //-- on error
        this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
      },
      () => { //-- on completion
        this._globalMethod.mostrarMensagem('Dados de usuário foram recuperados com êxito.', this._navCtrl);
      }
      );
  }

  private setUsuario(): any {
    return {
        displayName: this.usuario.displayName ? this.usuario.displayName : '',
        email: this.usuario.email ? this.usuario.email : '',
        password: this.usuario.password ? this.usuario.password : '',
        photoURL: this.usuario.photoURL ? this.usuario.photoURL : '',
        providerId: this.usuario.providerId ? this.usuario.providerId : '',
        uid: this.usuario.uid ? this.usuario.uid : '',
        endereco: this.usuario.endereco ? this.usuario.endereco : new Endereco()
      };
  }
  
  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }
}
