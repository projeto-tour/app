import { Component, ViewChild, ElementRef }  from '@angular/core';

import { NavParams, NavController, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { groupBy, get, clone, find, isEqual, findIndex } from 'lodash';

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

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  pontoInteresse: PontoInteresse = new PontoInteresse();
  listPontoInteresse: ITipoPontoInteresse[] = [];
  pontosInteresse: IPontoInteresse[] = [];

  dados: any;
  mensagenErro: any;

  constructor(
    public _platform: Platform,
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _pontoInteresseService: PontoInteresseService,
    public _tipoPontoInteresseService: TipoPontoInteresseService,
    public _globalMethod: GlobalMethodService,
    public _alertCtrl: AlertController) {
    this.dados = this._navParams.data;
    _tipoPontoInteresseService.list.subscribe((list: ITipoPontoInteresse[]) => {
      this.listPontoInteresse = list;
      this.pontoInteresse.tipo_ponto_interesse = this.pontoInteresse.tipo_ponto_interesse || list[0].$key;
    });

    _pontoInteresseService.list.subscribe((pontos: IPontoInteresse[]) => {
      pontos.forEach(ponto => {
        this.atualizarPontoInteresse(ponto.$key, ponto);
      });
    });

  }

  ionViewLoaded() {
    this.carregarMapa();
  }

  onSelectPlace(place: Object) {
    let location = place['geometry']['location'];
    this.pontoInteresse.descricao = place['name'];
    this.pontoInteresse.observacao = place['formatted_address'];
    this.pontoInteresse.localizacao = { 'lat': location.lat(), 'lng': location.lng() };
    this.atualizarPontoInteresse(null, clone(this.pontoInteresse));
    this.adicionarPontoNoMapa(location.lat(), location.lng());
  }

  onCarregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  private exibirDetallhesPontoInteresse(pontoInteresse: IPontoInteresse) {
    let prompt = this._alertCtrl.create({
      title: 'Ponto de Interesse',
      message: pontoInteresse.descricao,
      inputs: [
        {
          name: 'observacao',
          label: 'Observação',
          value: pontoInteresse.observacao,
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
            pontoInteresse.observacao = data.observacao;
            this.salvar(pontoInteresse);
          }
        }
      ]
    });
    prompt.present();
  }

  private carregarMapa() {

    // Geolocation.getCurrentPosition().then((position) => {
    //   let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //   let mapOptions = {
    //     center: latLng,
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   };
    //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // }, (err) => {
    //   this._globalMethod.mostrarMensagem('Falha ao carregar o mapa.', this._navCtrl);
    // });

    this._platform.ready().then(() => {
      let latLng = new google.maps.LatLng(-15.7213869, -48.0783234);
      let mapOptions = {
        center: latLng,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    });

  }

  private adicionarPontoNoMapa(lat: number, lng: number) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: { lat: lat, lng: lng }
    });

    google.maps.event.addListener(marker, 'click', (e) => {
      let latLng = JSON.parse(JSON.stringify(e.latLng));
      let ponto = clone(find(this.pontosInteresse, { localizacao: { lat: <number>get(latLng, 'lat'), lng: <number>get(latLng, 'lng') } }));
      this.exibirDetallhesPontoInteresse(ponto);
    });

    this.map.setCenter({ lat: lat, lng: lng });
  }

  private salvar(pontoInteresse: IPontoInteresse): void {
    if (pontoInteresse.$key) {
      this._pontoInteresseService.update(pontoInteresse, {
        descricao: pontoInteresse.descricao,
        localizacao: pontoInteresse.localizacao,
        observacao: pontoInteresse.observacao,
        tipo_ponto_interesse: pontoInteresse.tipo_ponto_interesse
      }).then(data => {
        this._globalMethod.mostrarMensagem(`Dodos do ponto de interesse ${pontoInteresse.descricao} foram salvos com êxito.`, this._navCtrl);
      }).catch(this.handleError);
    } else {
      let key = this._pontoInteresseService.create(pontoInteresse);
      if (key) {
        this._tipoPontoInteresseService.setPontoInteresse(pontoInteresse.tipo_ponto_interesse, JSON.parse(`{"${key}": true }`))
          .then(data => {
            this._globalMethod.mostrarMensagem(`Dodos do ponto de interesse ${pontoInteresse.descricao} foram atualizado com êxito.`, this._navCtrl);
          }).catch(this.handleError);
      }
    }
  }

  private atualizarPontoInteresse(key: string, pontoInteresse: IPontoInteresse): void {
    let index = findIndex(this.pontosInteresse, { localizacao: { 'lat': pontoInteresse.localizacao.lat, 'lng': pontoInteresse.localizacao.lng } });
    key = key && key.length > 0 ? key : this.pontosInteresse[index] ? this.pontosInteresse[index].$key || null : null;
    this.pontosInteresse.slice(index, 1);
    if (key && key.length > 0) {
      this.pontosInteresse.push({
        $key: key,
        descricao: pontoInteresse.descricao,
        localizacao: pontoInteresse.localizacao,
        observacao: pontoInteresse.observacao,
        tipo_ponto_interesse: pontoInteresse.tipo_ponto_interesse
      });
    } else {
      this.pontosInteresse.push({
        descricao: pontoInteresse.descricao,
        localizacao: pontoInteresse.localizacao,
        observacao: pontoInteresse.observacao,
        tipo_ponto_interesse: pontoInteresse.tipo_ponto_interesse
      });
    }
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }

}
