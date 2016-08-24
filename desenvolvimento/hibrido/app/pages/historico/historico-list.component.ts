import { Component }  from '@angular/core';
import { NgClass } from '@angular/common';

import { NavParams, NavController, Platform, ActionSheetController, AlertController } from 'ionic-angular';

import { filter } from 'lodash';

import { GlobalMethodService, IAgenda, ITipoAgenda } from '../shared';
import { AgendaService } from '../../providers/data';

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

  titulo: string = 'Históricos';
  tipoAgenda: ITipoAgenda;
  todasAgendas: IAgenda[] = [];
  agendas: IAgenda[] = [];
  filtro: string = '';
  segment: string = 'todas';
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _platform: Platform,
    public _service: AgendaService,
    public _globalMethod: GlobalMethodService,
    public _alertCtrl: AlertController,
    public _actionSheetCtrl: ActionSheetController) {
    this.tipoAgenda = this._navParams.data;
    _service.agendasPorTipo.subscribe((agendas: IAgenda[]) => {
      this.agendas = this.todasAgendas = agendas;
      this.atualizarLista();
    });
  }

  ionViewLoaded() {
    this._service.filterByTipo(this.tipoAgenda.$key);
  }

  atualizarLista(): void {
    if (this.segment === 'favoritas') {
      this.agendas = filter(this.todasAgendas, { 'favorito': true });
    } else {
      this.agendas = this.todasAgendas;
    }
  }

  marcarComoFavorito(agenda: IAgenda): void {
    agenda.favorito = !agenda.favorito;
    this._service.update(agenda, { favorito: agenda.favorito }).then(() => {
      this._globalMethod.mostrarMensagem(`${agenda.descricao} foi adicionado aos favoritos.`, this._navCtrl);
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
    let actionSheet = this._actionSheetCtrl.create({
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
            // -- TODO Compartilhar
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
    actionSheet.present();
  }

  excluir(agenda: IAgenda): void {
    let confirm = this._alertCtrl.create({
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
            // -- TODO Excluir
            console.log('Sim clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
