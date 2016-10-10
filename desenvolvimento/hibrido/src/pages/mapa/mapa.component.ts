import { Component, ViewChild, ElementRef }  from '@angular/core';

import { NavParams, NavController, Platform, AlertController } from 'ionic-angular';

// import { get, clone, find, findIndex } from 'lodash';
import _ from 'lodash';

import { GlobalMethodService } from '../../providers/global/global-method.service';
import { PontoInteresseService } from '../../providers/data/ponto-interesse.service';
import { TipoPontoInteresseService } from '../../providers/data/tipo-ponto-interesse.service';

import { PreferenciaPage } from '../preferencia';

import { ITipoPontoInteresse, IPontoInteresse, PontoInteresse } from '../shared';

declare var google: any;

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.component.html'
})
export class MapaPage {

  titulo: string = 'Mapa';

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;

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
      this.pontoInteresse.tipo_ponto_interesse = this.pontoInteresse.tipo_ponto_interesse || _.get(list[0], '$key', '');
    });
    _pontoInteresseService.list.subscribe((pontos: IPontoInteresse[]) => {
      this.pontosInteresse = pontos;
    });
  }

  ionViewDidLoad() {
    this.carregarMapa();
  }

  onSelectPlace(place: Object) {
    let location = place['geometry']['location'];
    this.pontoInteresse.descricao = place['name'];
    this.pontoInteresse.observacao = place['formatted_address'];
    this.pontoInteresse.localizacao = { 'lat': location.lat(), 'lng': location.lng() };
    this.adicionarPontoNoMapa(location.lat(), location.lng());
  }

  onCarregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  private exibirDetallhesPontoInteresse() {
    let prompt = this._alertCtrl.create({
      title: 'Ponto de Interesse',
      message: this.pontoInteresse.descricao,
      inputs: [
        {
          name: 'observacao',
          label: 'Observação',
          value: this.pontoInteresse.observacao,
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
            this.salvar();
          }
        }
      ]
    });
    prompt.present();
  }

  private carregarMapa() {

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //     let mapOptions = {
    //       center: latLng,
    //       zoom: 15,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };
    //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //   });
    // } else {
    //   this._platform.ready().then(() => {
    //     let latLng = new google.maps.LatLng(-15.7213869, -48.0783234);
    //     let mapOptions = {
    //       center: latLng,
    //       zoom: 8,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };
    //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //   });
    // }
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
    if (this.marker) {
      this.marker.setMap(null);
    }
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: { lat: lat, lng: lng }
    });

    google.maps.event.addListener(this.marker, 'click', (e) => {
      this.exibirDetallhesPontoInteresse();
    });

    this.map.setCenter({ lat: lat, lng: lng });
  }

  private salvar(): void {
    let key = this.getKeyPontoInteresse();
    console.log(key);
    console.log(JSON.stringify(this.pontoInteresse));
    if (key) {
      this._pontoInteresseService.update(key, {
        descricao: this.pontoInteresse.descricao,
        localizacao: this.pontoInteresse.localizacao,
        observacao: this.pontoInteresse.observacao,
        tipo_ponto_interesse: this.pontoInteresse.tipo_ponto_interesse
      }).then(data => {
        this._globalMethod.mostrarMensagem(`Dodos do ponto de interesse ${this.pontoInteresse.descricao} foram salvos com êxito.`, this._navCtrl);
      }).catch(this.handleError);
    } else {
      let key = this._pontoInteresseService.create(this.pontoInteresse);
      if (key) {
        this._tipoPontoInteresseService.setPontoInteresse(this.pontoInteresse.tipo_ponto_interesse, JSON.parse(`{"${key}": true }`))
          .then(data => {
            this._globalMethod.mostrarMensagem(`Dodos do ponto de interesse ${this.pontoInteresse.descricao} foram atualizado com êxito.`, this._navCtrl);
          }).catch(this.handleError);
      }
    }
  }

  private getKeyPontoInteresse(): string {
    let index = _.findIndex(this.pontosInteresse, { localizacao: { 'lat': this.pontoInteresse.localizacao.lat || '', 'lng': this.pontoInteresse.localizacao.lng || '' } });
    return this.pontosInteresse[index] ? this.pontosInteresse[index].$key || null : null;
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }

}
