import { Component }  from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, Platform, ActionSheetController, AlertController } from 'ionic-angular';

import { keys, get } from 'lodash';

import { HistoricoListPage } from './';
import { PreferenciaPage } from '../preferencia';

import { FirebaseAuthService } from '../../providers/auth';
import { GlobalMethodService, Historico, ITipoAgenda } from '../shared';
import { TipoAgendaService } from '../../providers/data/tipo-agenda.service';

@Component({
  templateUrl: 'build/pages/historico/historico.component.html'
})
export class HistoricoPage {

  titulo: string = 'Históricos';
  rows: number[] = [];
  filtro: string = '';
  historicos: Historico[] = [];
  mensagenErro: any;

  constructor(
    public _navCtrl: NavController,
    public _platform: Platform,
    public _globalMethod: GlobalMethodService,
    public _tipoAgendaService: TipoAgendaService,
    public _auth: FirebaseAuthService,
    public _alertCtrl: AlertController,
    public _actionSheetCtrl: ActionSheetController) {
    this.getHistoricos();
  }

  ionViewLoaded() { }

  carregarAgendas(historico: Historico): void {
    if (!historico.qtde_todos || historico.qtde_todos <= 0) {
      this._globalMethod.mostrarMensagem('Não existem agendas para o histórico selecionado.', this._navCtrl);
    } else {
      this._globalMethod.carregarPagina(HistoricoListPage, historico.tipo_agenda, true, this._navCtrl);
    }
  }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  gerenciar(historico: Historico): void {
    if (!historico.qtde_todos || historico.qtde_todos <= 0) {
      this._globalMethod.mostrarMensagem('Não existem agendas para o histórico selecionado.', this._navCtrl);
    } else {
      let actionSheet = this._actionSheetCtrl.create({
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
      actionSheet.present();
    }

  }

  excluir(historico: Historico): void {
    let confirm = this._alertCtrl.create({
      title: 'Excluir',
      message: `Deseja realmente excluir todas agendas do tipo ${historico.tipo_agenda.descricao}?`,
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
            // TODO Excluir agendas
            console.log('Sim clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  private getHistoricos(): void {
    this._tipoAgendaService.tipos.subscribe((tipos: ITipoAgenda[]) => { // -- on sucess
      this.historicos = [];
      tipos.forEach((tipo: ITipoAgenda) => {
        let historico = new Historico();
        historico.qtde_todos = keys(get(tipo.agenda, `${this._auth.uid || this._auth.userInfo.uid}`)).length;
        historico.tipo_agenda = tipo;
        this.historicos.push(historico);
      });
      this.rows = Array.from(Array(Math.ceil((this.historicos).length / 2)).keys());
    },
      error => { // -- on error
        this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
      });
  }

}
