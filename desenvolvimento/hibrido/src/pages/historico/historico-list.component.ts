import { Component }  from '@angular/core';

import { NavParams, NavController, Platform, ActionSheetController, AlertController } from 'ionic-angular';
import { InAppBrowser }  from 'ionic-native';

// import { filter, clone } from 'lodash';
import _ from 'lodash';

import { GlobalMethodService } from '../../providers/global/global-method.service';
import { AgendaService } from '../../providers/data/agenda.service';

import { AgendaDetailPage } from '../agenda';
import { PreferenciaPage } from '../preferencia';
import { RotaPage } from '../rota';

import { IAgenda, ITipoAgenda } from '../shared';

@Component({
  selector: 'page-historico-list',
  templateUrl: 'historico-list.component.html'
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
    public _agendaService: AgendaService,
    public _globalMethod: GlobalMethodService,
    public _alertCtrl: AlertController,
    public _actionSheetCtrl: ActionSheetController) {
    this.tipoAgenda = this._navParams.data;
    _agendaService.agendasPorTipo.subscribe((agendas: IAgenda[]) => {
      this.agendas = this.todasAgendas = agendas;
      this.onAtualizarLista();
    });
  }

  ionViewDidLoad() {
    this._agendaService.filterByTipo(this.tipoAgenda.$key);
  }

  onAtualizarLista(): void {
    if (this.segment === 'favoritas') {
      this.agendas = _.filter(this.todasAgendas, { 'favorito': true });
    } else {
      this.agendas = this.todasAgendas;
    }
  }

  onMarcarComoFavorito(agenda: IAgenda): void {
    agenda.favorito = !agenda.favorito;
    this._agendaService.update(agenda, { favorito: agenda.favorito }).then(() => {
      this._globalMethod.mostrarMensagem(`${agenda.descricao} foi adicionado aos favoritos.`, this._navCtrl);
    });
  }

  onCarregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  onCarregarMapa(agenda: IAgenda): void {
    new InAppBrowser(`http://maps.google.com/maps?q=${agenda.descricao}`, '_blank');
  }

  onCarregarRotas(agenda: IAgenda): void {
    this._globalMethod.carregarPagina(RotaPage, _.clone(agenda), true, this._navCtrl);
  }

  onReagendar(agenda: IAgenda): void {
    this._globalMethod.carregarPagina(AgendaDetailPage, { titulo: 'Reagendar', agenda: _.clone(agenda) }, true, this._navCtrl);
  }

  onGerenciar(agenda: IAgenda): void {
    let actionSheet = this._actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: !this._platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.onExcluir(agenda);
          }
        },
        {
          text: 'Reagendar',
          icon: !this._platform.is('ios') ? 'redo' : null,
          handler: () => {
            this.onReagendar(agenda);
          }
        },
        // {
        //   text: 'Compartilhar',
        //   icon: !this._platform.is('ios') ? 'share' : null,
        //   handler: () => {
        //     // -- TODO Compartilhar
        //     console.log('Compartilhar clicked');
        //   }
        // },
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

  onExcluir(agenda: IAgenda): void {
    let confirm = this._alertCtrl.create({
      title: 'Excluir',
      message: `Deseja excluir agenda ${agenda.descricao}?`,
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
