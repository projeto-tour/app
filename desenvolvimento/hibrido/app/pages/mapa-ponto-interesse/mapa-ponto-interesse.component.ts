import { Component }  from '@angular/core';

import { NavParams, NavController } from 'ionic-angular';

import { Mapa, MapaService } from '../mapa';

import { GlobalMethodService } from '../shared';

import { PreferenciaPage } from '../preferencia';

@Component({
  templateUrl: 'build/pages/mapa-ponto-interesse/mapa-ponto-interesse.component.html'
})
export class MapaPontoInteressePage {

  titulo: string = 'Mapa';
  pontosMapa: any;
  pontoInteresse: string = '1';
  mapa: any;
  dados: any;
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _service: MapaService,
    public _globalMethod: GlobalMethodService) {
    this.dados = this._navParams.data;
  }

  ionViewLoaded() {
    this.carregarMapa();
  }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  private carregarMapa(): void {
    this._service.getMapas()
      .subscribe(
      (data: Mapa[]) => { //-- on sucess
        this.pontosMapa = data;
      },
      error => { //-- on error
        this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
      },
      () => { //-- on completion
        let mapEle = document.getElementById('map-ponto-interesse');

        let map = new google.maps.Map(mapEle, {
          center: this.pontosMapa.find(d => d.center),
          zoom: 13
        });

        this.pontosMapa.forEach(markerData => {
          let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
          });

          let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            title: markerData.name
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });
      }
      );
  }

}
