import { Component }  from '@angular/core';

import { NavParams, NavController, Alert } from 'ionic-angular';

import { Agenda } from '../../providers/agendas';
import { GlobalMethodService } from '../shared';

import { RotaView, RotaService } from './';

import { RotaCreatePage, RotaDetailPage } from '../rota-detail';
import { MapaPage } from '../mapa';

@Component({
  templateUrl: 'build/pages/rota/rota.component.html'
})
export class RotaPage {

  titulo: string = "Rotas";
  agenda: Agenda;
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

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  incluir(): void {
    this._navCtrl.push(RotaCreatePage, this.agenda);
  }

  navegarNoMapa(rota: RotaView): void {
    this._navCtrl.push(MapaPage, rota);
  }

  carregarMapa(rota: RotaView): void {
    this._navCtrl.push(MapaPage, rota);
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
    // this._service.getRotas(this.agenda.id)
    //   .subscribe(
    //   (data: RotaView[]) => { //-- on sucess
    //     this.agenda.rotas = data;
    //   },
    //   error => { //-- on error
    //     this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
    //   },
    //   () => { //-- on completion

    //   }
    //   );
  }
}