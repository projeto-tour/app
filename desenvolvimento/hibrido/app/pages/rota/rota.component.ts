import { Component }  from '@angular/core';

import { NavParams, NavController, AlertController } from 'ionic-angular';

import { GlobalMethodService, IAgenda, Agenda } from '../shared';

import { RotaView, RotaService } from './';

import { RotaCreatePage, RotaDetailPage } from '../rota-detail';
import { MapaRotaPage } from '../mapa-rota';

@Component({
  templateUrl: 'build/pages/rota/rota.component.html'
})
export class RotaPage {

  titulo: string = 'Rotas';
  agenda: IAgenda = new Agenda();
  rotas: RotaView[] = [];
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _service: RotaService,
    public _globalMethod: GlobalMethodService,
    public _alertCtrl: AlertController) {
    this.agenda.$key = _navParams.data;
    console.log(JSON.stringify(this.agenda));
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
    let confirm = this._alertCtrl.create({
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
    confirm.present();
  }

  private getRotas(): void {
    this._service.getRotas()
      .subscribe(
      (rotas: RotaView[]) => { // -- on sucess
        this.rotas = rotas;
      },
      error => { // -- on error
        this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
      },
      () => { // -- on completion

      }
      );
  }
}