import { Component }  from '@angular/core';
import { NgClass } from '@angular/common';

import { NavParams, NavController, Modal, Platform, ActionSheet, Alert } from 'ionic-angular';

import { GlobalMethodService } from '../shared';

import { AgendaView, AgendaFilterPipe, AgendaService } from '../agenda';
import { AgendaDetailPage } from '../agenda-detail';
import { PreferenciaPage } from '../preferencia';
import { MapaPage } from '../mapa';
import { RotaPage } from '../rota';

@Component({
  templateUrl: 'build/pages/historico/historico-list.component.html',
  pipes: [AgendaFilterPipe],
  directives: [NgClass]
})
export class HistoricoListPage {

  titulo: string = "Históricos";
  todasAgendas: AgendaView[] = [];
  agendas: AgendaView[] = [];
  dados: any;
  filtro: string = '';
  segment: string = 'todas';
  mensagenErro: any;

  constructor(private _navParams: NavParams,
    private _navCtrl: NavController,
    private _platform: Platform,
    private _service: AgendaService,
    public _globalMethod: GlobalMethodService) {
    this.dados = this._navParams.data;
  }

  ionViewLoaded() {
    this.getAgendas();
  }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  atualizarLista(): void {
    console.log('atualizarLista: ' + JSON.stringify(this.segment))
    if (this.segment === 'favoritas') {
      this.agendas = this.todasAgendas.filter((data: AgendaView) => (new Date(data.dataFim) < new Date()) && data.favorito);
    } else {
      this.agendas = this.todasAgendas.filter((data: AgendaView) => new Date(data.dataFim) < new Date());
    }
  }

  marcarComoFavorito(agenda: AgendaView): void {
    agenda.favorito = !agenda.favorito;
    this.atualizarLista();
  }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  carregarMapa(agenda: AgendaView): void {
    this._navCtrl.push(MapaPage, agenda);
  }

  carregarRotas(agenda: AgendaView): void {
    this._globalMethod.carregarPagina(RotaPage, agenda, true, this._navCtrl);
  }

  reagendar(agenda: AgendaView): void {
    this._globalMethod.carregarPagina(AgendaDetailPage, { titulo: 'Reagendar', agenda: agenda }, true, this._navCtrl);
  }

  atualizar(refresher) {
    //-- TODO
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  gerenciar(agenda: AgendaView): void {
    let actionSheet = ActionSheet.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: !this._platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.excluir(agenda);
          }
        },
        {
          text: 'Reagendar',
          icon: !this._platform.is('ios') ? 'redo' : null,
          handler: () => {
            this.reagendar(agenda);
          }
        },
        {
          text: 'Compartilhar',
          icon: !this._platform.is('ios') ? 'share' : null,
          handler: () => {
            //-- TODO
            console.log('Compartilhar clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: !this._platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancelar clicked');
          }
        }
      ]
    });
    this._navCtrl.present(actionSheet);
  }

  excluir(agenda: AgendaView): void {
    let confirm = Alert.create({
      title: 'Excluir',
      message: `Deseja realmente excluir agenda ${agenda.descricao}?`,
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
            //-- TODO
            console.log('Sim clicked');
          }
        }
      ]
    });
    this._navCtrl.present(confirm);
  }

  private getAgendas(): void {
    this._service.getAgendasRealidas()
      .subscribe(
      (data: AgendaView[]) => { //-- on sucess
        this.todasAgendas = data;
      },
      error => { //-- on error
        this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
      },
      () => { //-- on completion
        this.agendas = this.todasAgendas.filter((data: AgendaView) => new Date(data.dataFim) < new Date());
      }
      );
  }

}
