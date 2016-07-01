import { Component }  from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, Platform, ActionSheet, Alert } from 'ionic-angular';

import { Historico, HistoricoListPage } from './';
import { GlobalMethodService } from '../shared';
import { AgendaService, TipoAgendaService, IAgenda, ITipoAgenda } from '../../providers/agendas';
import { PreferenciaPage } from '../preferencia';

@Component({
  templateUrl: 'build/pages/historico/historico.component.html'
})
export class HistoricoPage {

  titulo: string = "Históricos";
  historicos: Historico[] = [];
  rows: number[] = [];
  filtro: string = '';
  mensagenErro: any;

  constructor(private _navCtrl: NavController,
    private _platform: Platform,
    public _globalMethod: GlobalMethodService,
    private _agendaService: AgendaService,
    private _tipoAgendaService: TipoAgendaService) {
  }

  ionViewLoaded() {
    this.getHistoricos();
    this._agendaService.filterHistoricos((new DatePipe()).transform(new Date(), 'yyyy-MM-dd'));
  }

  carregarAgendas(historico: Historico): void {
    if (historico === null || historico.agendas === null || historico.agendas.length <= 0) {
      this._globalMethod.mostrarMensagem('Não existem agendas para o histórico selecionado.', this._navCtrl);
    } else {
      this._globalMethod.carregarPagina(HistoricoListPage, historico.agendas, true, this._navCtrl);
    }
  }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  sincronizar(refresher) {
    //-- TODO
    this.historicos = [];
    this.getHistoricos();
    this._agendaService.filterHistoricos((new DatePipe()).transform(new Date(), 'yyyy-MM-dd'));
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  gerenciar(historico: Historico): void {
    if (historico === null || historico.agendas === null || historico.agendas.length <= 0) {
      this._globalMethod.mostrarMensagem('Não existem agendas para o histórico selecionado.', this._navCtrl);
    } else {
      let actionSheet = ActionSheet.create({
        title: 'Opções',
        buttons: [
          {
            text: 'Excluir Agendas',
            role: 'destructive',
            icon: !this._platform.is('ios') ? 'trash' : null,
            handler: () => {
              this.excluir(historico);
            }
          },
          {
            text: 'Visualizar Agendas',
            icon: !this._platform.is('ios') ? 'open' : null,
            handler: () => {
              this.carregarAgendas(historico);
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

  }

  excluir(historico: Historico): void {
    let confirm = Alert.create({
      title: 'Excluir',
      message: `Deseja realmente excluir todas agendas do tipo ${historico.descricao}?`,
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

  private getHistoricos(): void {
    this._agendaService.historicos
      .subscribe(
      (agendas: IAgenda[]) => { //-- on sucess
        this._tipoAgendaService.tipos.subscribe(
          (tipos: ITipoAgenda[]) => { //-- on sucess
            tipos.forEach(tipo => {
              var historico = <Historico>tipo;
              historico.agendas = agendas.filter(agenda => agenda.tipoAgenda.id === tipo.$key);
              historico.qtdeFavoritos = historico.agendas.filter(agenda => agenda.favorito).length
              historico.qtdeTodos = historico.agendas.length;
              this.historicos.push(historico);
              this.rows = Array.from(Array(Math.ceil((this.historicos).length / 2)).keys());
            });
          });
      },
      error => { //-- on error
        this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
      });
  }

}
