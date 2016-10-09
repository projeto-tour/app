import { Component }  from '@angular/core';

import { NavParams, NavController, AlertController } from 'ionic-angular';
import { InAppBrowser }  from 'ionic-native';

// import { clone, isUndefined, isNull, isEmpty, filter } from 'lodash';
import _ from 'lodash';

import { GlobalMethodService } from '../../providers/global/global-method.service';
import { PontoInteresseService } from '../../providers/data/ponto-interesse.service';
import { TransporteService } from '../../providers/data/transporte.service';
import { RotaService } from '../../providers/data/rota.service';
import { AgendaService } from '../../providers/data/agenda.service';

import { RotaDetailPage } from './rota-detail.component';

import {
  IAgenda,
  IRota,
  Rota
} from '../shared';

@Component({
  selector: 'page-rota',
  templateUrl: 'rota.component.html'
})
export class RotaPage {

  titulo: string = 'Rotas';
  agenda: IAgenda;
  listRota: IRota[] = [];

  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _rotaService: RotaService,
    public _agendaService: AgendaService,
    public _pontoInteresseService: PontoInteresseService,
    public _transporteService: TransporteService,
    public _globalMethod: GlobalMethodService,
    public _alertCtrl: AlertController) {
    this.agenda = _navParams.data;
    this._rotaService.list.subscribe((list: IRota[]) => {
      let lista = list.filter(data => data.agenda === this.agenda.$key);
      if (lista && lista.length > 0) {
        this.ordenarRotas(lista);
      } else {
        this.listRota = [];
      }
    });
  }

  ionViewDidLoad() {
    this._rotaService.filterRotas(this.agenda.$key);
  }

  onAdd(): void {
    this._navCtrl.push(
      RotaDetailPage, {
        rota_pai: null,
        rota: new Rota({
          agenda: this.agenda.$key,
          rota_pai: null
        }),
        rota_filho: null,
        agenda: this.agenda
      });
  }

  onCreate(rota: IRota): void {
    this._navCtrl.push(
      RotaDetailPage, {
        rota_pai: _.clone(rota),
        rota: new Rota({
          agenda: this.agenda.$key,
          rota_pai: rota.$key
        }),
        rota_filho: _.clone(_.find(this.listRota, { 'rota_pai': rota.$key })),
        agenda: this.agenda
      });
  }

  onEdit(rota: IRota): void {
    this._navCtrl.push(
      RotaDetailPage, {
        rota_pai: null,
        rota: _.clone(rota),
        rota_filho: null,
        agenda: this.agenda
      });
  }

  onDelete(rota: IRota): void {
    if (_.filter(this.listRota, {
      'rota_pai': rota.$key
    }).length > 0) {
      this._globalMethod.mostrarMensagem(`Esta rota está associada a outra rota e não pode ser excluído.`, this._navCtrl);
    } else {
      // this.excluirRota(rota);
      let confirm = this._alertCtrl.create({
        title: 'Excluir',
        message: `Deseja excluir ${rota.ponto_partida} - ${rota.ponto_chegada} ?`,
        buttons: [{
          text: 'Não',
          handler: () => {
            console.log('Não clicked');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.excluirRota(rota);
          }
        }]
      });
      confirm.present();
    }
  }

  onLoadMapa(rota?: IRota): void {
    if (rota) {
      new InAppBrowser(`https://www.google.com.br/maps/dir/${rota.ponto_partida}/${rota.ponto_chegada}/`, '_blank');
    } else {
      let rotas = '';
      for (var index = 0; index < this.listRota.length; index++) {
        rotas = rotas + (index < this.listRota.length - 1 ? `${this.listRota[index].ponto_partida}/${this.listRota[index].ponto_chegada}/` :
          `${this.listRota[index].ponto_partida}/${this.listRota[index].ponto_chegada}`);
      }
      new InAppBrowser(`https://www.google.com.br/maps/dir/${rotas}/`, '_blank');
    }
  }

  excluirRota(rota: IRota): void {
    this._agendaService.setRota(rota.agenda, JSON.parse(`{"${rota.$key}": null }`))
      .then(() => {
        return this._transporteService.setRota(rota.transporte, JSON.parse(`{"${rota.$key}": null }`));
      }).then(() => {
        return this._pontoInteresseService.setRota(rota.ponto_interesse, JSON.parse(`{"${rota.$key}": null }`));
      }).then(() => {
        return this._agendaService.setRota(rota.agenda, JSON.parse(`{"${rota.$key}": true }`));
      }).then(() => {
        return this._rotaService.remove(rota.$key);
      }).then(() => {
        return this._rotaService.filterRotas(this.agenda.$key);
      }).then(() => {
        return this._globalMethod.mostrarMensagem(`A rota foi excluído com êxito.`, this._navCtrl);
      }).catch(this.handleError);
  }

  private ordenarRotas(rotas: IRota[]): void {
    this.listRota = [];
    this.listRota.push(rotas.filter(data => _.isUndefined(data.rota_pai) || _.isNull(data.rota_pai) || _.isEmpty(data.rota_pai))[0]);
    // this.listRota.push(_.find(rotas, { 'rota_pai': undefined }) || _.find(rotas, { 'rota_pai': null }) || _.find(rotas, { 'rota_pai': '' }));
    for (var index = 0; index < rotas.length - 1; index++) {
      this.listRota.push(_.find(rotas, { 'rota_pai': this.listRota[index].$key }));
    }
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }

}
