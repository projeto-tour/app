import { Component }  from '@angular/core';

import { NavParams, NavController, AlertController } from 'ionic-angular';
import { InAppBrowser }  from 'ionic-native';

import { clone, find, isUndefined, isNull, isEmpty } from 'lodash';

import {
  GlobalMethodService,
  IAgenda,
  IRota,
  Rota
} from '../shared';
import { RotaService } from '../../providers/data/rota.service';

import { RotaDetailPage } from '../rota-detail';

@Component({
  templateUrl: 'build/pages/rota/rota.component.html'
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
    public _globalMethod: GlobalMethodService,
    public _alertCtrl: AlertController) {
    this.agenda = _navParams.data;
    _rotaService.list.subscribe((list: IRota[]) => {
      if (list && list.length > 0) {
        this.ordenarRotas(list.filter(data => data.agenda === this.agenda.$key));
      }
    });
  }

  ionViewLoaded() {
    this._rotaService.filterRotas(this.agenda.$key);
  }

  onAdd(): void {
    this._navCtrl.push(
      RotaDetailPage, {
        rota_pai: null,
        rota: new Rota({ agenda: this.agenda.$key, rota_pai: null }),
        rota_filho: null
      });
  }

  onCreate(rota: IRota): void {
    this._navCtrl.push(
      RotaDetailPage, {
        rota_pai: rota,
        rota: new Rota({ agenda: this.agenda.$key, rota_pai: rota.$key }),
        rota_filho: this.listRota.find(data => data.rota_pai === rota.$key)
      });
  }

  onEdit(rota: IRota): void {
    this._navCtrl.push(
      RotaDetailPage, {
        rota_pai: null,
        rota: clone(rota),
        rota_filho: null
      });
  }

  onDelete(rota: IRota): void {
    let confirm = this._alertCtrl.create({
      title: 'Excluir',
      message: `Deseja excluir ${rota.ponto_partida} - ${rota.ponto_chegada} ?`,
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Não clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            // -- TODO
            console.log('Sim clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  onLoadMapa(rota?: IRota): void {
    if (rota) {
      new InAppBrowser(`https://www.google.com.br/maps/dir/${rota.ponto_partida}/${rota.ponto_chegada}/`, '_blank');
    } else {
      let rotas = '';
      for (var index = 0; index < this.listRota.length; index++) {
        rotas = rotas + (index < this.listRota.length - 1 ? `${this.listRota[index].ponto_partida}/${this.listRota[index].ponto_chegada}/`
          : `${this.listRota[index].ponto_partida}/${this.listRota[index].ponto_chegada}`);
      }
      new InAppBrowser(`https://www.google.com.br/maps/dir/${rotas}/`, '_blank');
    }
  }

  private ordenarRotas(rotas: IRota[]): void {
    this.listRota = [];
    this.listRota.push(rotas.find(data => isUndefined(data.rota_pai) || isNull(data.rota_pai) || isEmpty(data.rota_pai)));
    for (var index = 0; index < rotas.length - 1; index++) {
      this.listRota.push(rotas.find(data => data.rota_pai === this.listRota[index].$key));
    }
  }

}
