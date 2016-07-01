import { Component }  from '@angular/core';

import { NavParams, NavController, Alert } from 'ionic-angular';

import { Agenda } from '../../providers/agendas';
import { GlobalMethodService } from '../shared';

import { RotaView, RotaService } from './';

import { RotaCreatePage, RotaDetailPage } from '../rota-detail';
import { MapaRotaPage } from '../mapa-rota';

@Component({
  templateUrl: 'build/pages/rota/rota.component.html'
})
export class RotaPage {

  titulo: string = "Rotas";
  agenda: Agenda;
  rotas: RotaView[] = [];
  mensagenErro: any;

  constructor(private _navParams: NavParams,
    private _navCtrl: NavController,
    private _service: RotaService,
    public _globalMethod: GlobalMethodService) {
    this.agenda = _navParams.data;
  }

  ionViewLoaded() {
    this.getRotas();
  }

  incluir(): void {
    this._navCtrl.push(RotaCreatePage, this.agenda);
  }

  navegarNoMapa(rota: RotaView): void {
    this._navCtrl.push(MapaRotaPage, rota);
  }

  carregarMapa(rota: RotaView): void {
    this._navCtrl.push(MapaRotaPage, rota);
  }

  gerenciarRota(rota: RotaView): void {
    this._navCtrl.push(RotaDetailPage, rota);
  }

  excluir(rota: RotaView): void {
    let confirm = Alert.create({
      title: 'Excluir',
      message: 'Deseja realmente excluir essa rota?',
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
            console.log('Sim clicked');
          }
        }
      ]
    });
    this._navCtrl.present(confirm);
  }

  private getRotas(): void {
    this._service.getRotas()
      .subscribe(
      (rotas: RotaView[]) => { //-- on sucess
        this.rotas = rotas;
      },
      error => { //-- on error
        this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
      },
      () => { //-- on completion

      }
      );
  }
}