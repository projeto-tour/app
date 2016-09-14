import { Component }  from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { FirebaseAuthService } from '../../providers/auth';
import { GlobalMethodService, Endereco } from '../shared';

@Component({
  templateUrl: 'build/pages/usuario/usuario-profile.component.html'
})
export class UsuarioProfilePage {

  titulo: string = 'Perfil';

  endereco: Endereco = new Endereco();
  mensagenErro: any;

  constructor(
    public _viewCtrl: ViewController,
    public _navCtrl: NavController,
    public _auth: FirebaseAuthService,
    public _globalMethod: GlobalMethodService) {
  }

  ionViewLoaded() {
    Geolocation.getCurrentPosition().then((position) => {
      this.endereco.localizacao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      // TODO Recuperar o endereco
    }, (err) => {
      this._globalMethod.mostrarMensagem('Falha ao carregar o mapa.', this._navCtrl);
    });
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }

}
