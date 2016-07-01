import { Component }  from '@angular/core';
import { NgClass } from '@angular/common';

import { NavParams, NavController, Modal, Platform, ActionSheet, Alert } from 'ionic-angular';

import { GlobalMethodService } from '../shared';

import { AgendaService, IAgenda } from '../../providers/agendas';
import { AgendaFilterPipe } from '../agenda';
import { AgendaDetailPage } from '../agenda-detail';
import { PreferenciaPage } from '../preferencia';
import { MapaAgendaPage } from '../mapa-agenda';
import { RotaPage } from '../rota';

@Component({
  templateUrl: 'build/pages/historico/historico-list.component.html',
  pipes: [AgendaFilterPipe],
  directives: [NgClass]
})
export class HistoricoListPage {

  titulo: string = "Históricos";
  todasAgendas: IAgenda[] = [];
  agendas: IAgenda[] = [];
  filtro: string = '';
  segment: string = 'todas';
  mensagenErro: any;

  constructor(private _navParams: NavParams,
    private _navCtrl: NavController,
    private _platform: Platform,
    private _service: AgendaService,
    public _globalMethod: GlobalMethodService) {
    this.todasAgendas = this._navParams.data;
    this.agendas = this.todasAgendas;
  }

  atualizarLista(): void {
    if (this.segment === 'favoritas') {
      this.agendas = this.todasAgendas.filter((agenda: IAgenda) => agenda.favorito);
    } else {
      this.agendas = this.todasAgendas;
    }
  }

  marcarComoFavorito(agenda: IAgenda): void {
    agenda.favorito = !agenda.favorito;
    this._service.updateAgenda(agenda, { favorito: agenda.favorito }).then(() => {
      this.atualizarLista();
    });
  }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  carregarMapa(agenda: IAgenda): void {
    this._navCtrl.push(MapaAgendaPage, agenda);
  }

  carregarRotas(agenda: IAgenda): void {
    this._globalMethod.carregarPagina(RotaPage, agenda, true, this._navCtrl);
  }

  reagendar(agenda: IAgenda): void {
    this._globalMethod.carregarPagina(AgendaDetailPage, { titulo: 'Reagendar', agenda: agenda }, true, this._navCtrl);
  }

  gerenciar(agenda: IAgenda): void {
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

  excluir(agenda: IAgenda): void {
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

}
