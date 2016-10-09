import { Component }  from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';
// import { Geolocation } from 'ionic-native';

import { FirebaseAuthService } from '../../providers/auth/firebase-auth.service';
import { GlobalMethodService } from '../../providers/global/global-method.service';

import { Endereco } from '../shared';

declare var google: any;

@Component({
  selector: 'page-usuario-profile',
  templateUrl: 'usuario-profile.component.html'
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

  ionViewDidLoad() {
    this.onGetGeolocation()
  }

  onGetCamerar(): void {

  }

  onGetGeolocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.endereco.localizacao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': this.endereco.localizacao }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              this.endereco.logradouro = results[0].formatted_address;
            }
          }
        });
      });
    } else {
      this._globalMethod.mostrarMensagem('Falha ao carregar o mapa.', this._navCtrl);
    }
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }

}
