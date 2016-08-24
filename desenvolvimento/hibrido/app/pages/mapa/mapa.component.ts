import { Component, ViewChild, ElementRef }  from '@angular/core';

import { NavParams, NavController, Platform, AlertController } from 'ionic-angular';
import { Geolocation, GoogleMap } from 'ionic-native';

import { groupBy, get } from 'lodash';

import {
  GlobalMethodService,
  ITipoPontoInteresse,
  IPontoInteresse,
  PontoInteresse,
  GoogleplaceDirective
} from '../shared';
import { PontoInteresseService } from '../../providers/data/ponto-interesse.service';
import { TipoPontoInteresseService } from '../../providers/data/tipo-ponto-interesse.service';

import { PreferenciaPage } from '../preferencia';

declare var google;

@Component({
  templateUrl: 'build/pages/mapa/mapa.component.html',
  directives: [
    GoogleplaceDirective
  ]
})
export class MapaPage {

  titulo: string = 'Mapa';
  segment: string = 'mapa';

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  pontoInteresse: PontoInteresse = new PontoInteresse();

  tiposPontoInteresse: ITipoPontoInteresse[] = [];
  pontosInteresse: any = {};

  dados: any;
  mensagenErro: any;

  constructor(
    public platform: Platform,
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _pontoInteresseService: PontoInteresseService,
    public _tipoPontoInteresseService: TipoPontoInteresseService,
    public _globalMethod: GlobalMethodService,
    public _alertCtrl: AlertController) {
    this.dados = this._navParams.data;
    _tipoPontoInteresseService.tipos.subscribe((tipos: ITipoPontoInteresse[]) => {
      this.tiposPontoInteresse = tipos;
      this.pontoInteresse.tipo_ponto_interesse = this.pontoInteresse.tipo_ponto_interesse || tipos[0].$key;
    });

    _pontoInteresseService.tipos.subscribe((pontos: IPontoInteresse[]) => {
      this.pontosInteresse = groupBy(pontos, 'tipo_ponto_interesse');
    });
  }

  ionViewLoaded() {
    this.loadMap();
  }

  getPontosInteresse(tipo: string): any {
    return get(this.pontosInteresse, tipo);
  }

  loadMap() {
    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      this._globalMethod.mostrarMensagem('Falha ao carregar o mapa.', this._navCtrl);
    });
    
    // let latLng = new google.maps.LatLng(-21.205861, -47.810363);
    // let mapOptions = {
    //   center: latLng,
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  addMarker(content: string, lat: number, lng: number) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: { lat: lat, lng: lng }
    });
    this.addInfoWindow(marker, content);
    this.map.setCenter({ lat: lat, lng: lng });
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      // infoWindow.open(this.map, marker);
      this.infoWindow();
    });
  }

  getAddress(place: Object) {
    let location = place['geometry']['location'];
    let lat = location.lat();
    let lng = location.lng();
    this.pontoInteresse.descricao = place['name'];
    this.pontoInteresse.localizacao = { 'lat': lat, 'lng': lng };
    this.pontoInteresse.observacao = place['formatted_address'];
    let content = `<li class="mdl-list__item mdl-list__item--three-line">
                    <span class="mdl-list__item-primary-content">
                      <span>${place['name']}</span>
                      <span class="mdl-list__item-text-body">
                        ${place['formatted_address']}
                      </span>
                    </span>
                  </li>`;
    this.addMarker(content, lat, lng);
  }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  incluir(): void {
    let key = this._pontoInteresseService.create(this.pontoInteresse);
    if (key) {
      this._tipoPontoInteresseService.setPontoInteresse(this.pontoInteresse.tipo_ponto_interesse, JSON.parse(`{"${key}": true }`))
        .then(data => {
          this._globalMethod.mostrarMensagem('Dados de ponto interesse foram salvos com êxito.', this._navCtrl);
        })
        .catch(this.handleError);
    }
  }

  private infoWindow() {
    let prompt = this._alertCtrl.create({
      title: this.pontoInteresse.descricao,
      message: this.pontoInteresse.observacao,
      inputs: [
        {
          name: 'observacao',
          label: 'Observação',
          value: '',
          placeholder: 'Observação'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked: ', JSON.stringify(data));
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            this.pontoInteresse.observacao = data.observacao;
            console.log('Saved clicked: ', JSON.stringify(this.pontoInteresse));
            this.incluir();
          }
        }
      ]
    });
    prompt.present();
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }

}
