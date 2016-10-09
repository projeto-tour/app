import { Component }  from '@angular/core';
import { NavParams, ViewController, NavController } from 'ionic-angular';
import { InAppBrowser }  from 'ionic-native';

// import { isEmpty, isMatch, clone, get, lt } from 'lodash';
import _ from 'lodash';
import moment from 'moment';

import { GlobalMethodService } from '../../providers/global/global-method.service';
import { PontoInteresseService } from '../../providers/data/ponto-interesse.service';
import { TransporteService } from '../../providers/data/transporte.service';
import { RotaService } from '../../providers/data/rota.service';
import { AgendaService } from '../../providers/data/agenda.service';

import {
  IPontoInteresse,
  ITransporte,
  Rota,
  IRota,
  IAgenda
} from '../shared';

@Component({
  selector: 'page-rota-detail',
  templateUrl: 'rota-detail.component.html'
})
export class RotaDetailPage {

  titulo: string = 'Rota';
  editing: boolean = false;
  rotaPai: IRota = new Rota();
  rota: IRota = new Rota();
  rotaOrig: IRota = new Rota();
  rotaFilho: IRota = new Rota();
  agenda: IAgenda;
  listPontoInteresse: IPontoInteresse[] = [];
  listTransporte: ITransporte[] = [];
  now: string = moment().format('YYYY-MM-DD');

  private mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController,
    public _navCtrl: NavController,
    public _pontoInteresseService: PontoInteresseService,
    public _transporteService: TransporteService,
    public _rotaService: RotaService,
    public _agendaService: AgendaService,
    public _globalMethod: GlobalMethodService) {
    this.rotaPai = <IRota>this._navParams.data.rota_pai;
    this.rota = <IRota>this._navParams.data.rota;
    this.rotaFilho = <IRota>this._navParams.data.rota_filho;
    this.agenda = <IAgenda>this._navParams.data.agenda;
    this.editing = this.rota && this.rota.$key ? true : false;
    _pontoInteresseService.list.subscribe((list: IPontoInteresse[]) => {
      this.listPontoInteresse = list;
    });
    _transporteService.list.subscribe((list: ITransporte[]) => {
      this.listTransporte = list;
    });
  }

  ionViewDidLoad() {
    if (!this.editing) {
      this.onClear();
    }
    this.rotaOrig = _.clone(this.rota);
  }

  onClear(): void {
    this.rota.ponto_partida = _.get(this.rotaPai, 'ponto_chegada', '');
    this.rota.localizacao_ponto_partida = _.get(this.rotaPai, 'localizacao_ponto_chegada', '');
    this.rota.ponto_chegada = '';
    this.rota.localizacao_ponto_chegada = '';
    this.rota.data_saida = _.clone(this.now);
    this.rota.data_chegada = _.clone(this.now);
    this.rota.ponto_interesse = '';
    this.rota.transporte = '';
  }

  onRestore(): void {
    this.rota = _.clone(this.rotaOrig);
  }

  onSubmit(): void {
    if (this.isValid(this.rota)) {
      if (this.editing) {
        this.atualizar();
      } else {
        this.criar();
      }
    } else {
      this._globalMethod.mostrarMensagem('Por favor, preencha os campos de formulário corretamente.', this._navCtrl);
    }
  }

  onSelectPlacePontoPartida(place: Object) {
    let location = place['geometry']['location'];
    this.rota.ponto_partida = place['formatted_address'];
    this.rota.localizacao_ponto_partida = {
      'lat': location.lat(),
      'lng': location.lng()
    };
  }

  onSelectPlacePontoChegada(place: Object) {
    let location = place['geometry']['location'];
    this.rota.ponto_chegada = place['formatted_address'];
    this.rota.localizacao_ponto_chegada = {
      'lat': location.lat(),
      'lng': location.lng()
    };
  }

  onLoadMapa(): void {
    let rota = `${_.get(this.rota, 'ponto_partida', '')}
                /${_.get(this.rota, 'ponto_chegada', '')}
                /${_.get(this.listPontoInteresse.filter(data => data.$key === this.rota.ponto_interesse), 'descricao', '')}`;
    if (rota.length > 2) {
      new InAppBrowser(`https://www.google.com.br/maps/dir/${rota}/`, '_blank');
    }
  }

  onChangeDataSaida(data): void {
    if (_.lt(this.rota.data_chegada, this.rota.data_saida)) {
      this.rota.data_chegada = this.rota.data_saida;
    }
  }

  private criar() {
    let key = this._rotaService.create(new Rota(this.rota));
    if (key) {
      if (this.rotaFilho && this.rotaFilho.$key && !_.isEmpty(this.rotaFilho.$key)) {
        this._rotaService.update(this.rotaFilho.$key, JSON.parse(`{"rota_pai": "${key}" }`))
          .then(data => {
            this.updates(key, true, `Dados da rota foram salvos com êxito.`);
          }).catch(this.handleError);
      } else {
        this.updates(key, true, `Dados da rota foram salvos com êxito.`);
      }
    }
  }

  private atualizar() {
    this._rotaService.update(this.rota.$key, new Rota(this.rota))
      .then(data => {
        this.updates(this.rota.$key, true, `Dados da rota foram alterados com êxito.`);
      })
      .catch(this.handleError);
  }

  private updates(key: string, value: boolean, msg: string): void {
    this._pontoInteresseService.setRota(this.rota.ponto_interesse, JSON.parse(`{"${key}": true }`))
      .then(() => {
        return this._transporteService.setRota(this.rota.transporte, JSON.parse(`{"${key}": true }`));
      }).then(() => {
        return this._agendaService.setRota(this.rota.agenda, JSON.parse(`{"${key}": true }`));
      }).then(() => {
        if (this.editing && !_.isMatch(<IRota>this._navParams.data, {
          'ponto_interesse': this.rota.ponto_interesse
        })) {
          return this._pontoInteresseService.setRota((<IRota>this._navParams.data).ponto_interesse, JSON.parse(`{"${key}": null }`));
        }
        return;
      }).then(() => {
        if (this.editing && !_.isMatch(<IRota>this._navParams.data, {
          'transporte': this.rota.transporte
        })) {
          return this._transporteService.setRota((<IRota>this._navParams.data).transporte, JSON.parse(`{"${key}": null }`));
        }
        return;
      }).then(() => {
        return this._globalMethod.mostrarMensagem(msg, this._navCtrl);
      }).then(() => {
        this.dismiss();
      }).catch(this.handleError);
  }

  private isValid(rota: IRota): boolean {
    return rota &&
      (rota.data_saida && rota.data_saida.trim().length > 0) &&
      (rota.data_chegada && rota.data_chegada.length > 0) &&
      (rota.ponto_partida && rota.ponto_partida.length > 0) &&
      (rota.ponto_chegada && rota.ponto_chegada.length > 0) &&
      (rota.agenda && rota.agenda.length > 0);
      // (rota.ponto_interesse && rota.ponto_interesse.length > 0) &&
      // (rota.transporte && rota.transporte.length > 0);
  }

  private dismiss() {
    this._viewCtrl.dismiss();
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }

}
