import { Component }  from '@angular/core';
import { NavController, Platform, ActionSheetController, AlertController } from 'ionic-angular';

// import { keys, get } from 'lodash';
import _ from 'lodash';

import { FirebaseAuthService } from '../../providers/auth/firebase-auth.service';
import { GlobalMethodService } from '../../providers/global/global-method.service';
import { TipoAgendaService } from '../../providers/data/tipo-agenda.service';

import { HistoricoListPage } from './';
import { PreferenciaPage } from '../preferencia';

import { Historico, ITipoAgenda } from '../shared';

@Component({
  selector: 'page-historico',
  templateUrl: 'historico.component.html'
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

  ionViewDidLoad() { }

  onCarregarAgendas(historico: Historico): void {
    if (!historico.qtde_todos || historico.qtde_todos <= 0) {
      this._globalMethod.mostrarMensagem('Não existem agendas para o histórico selecionado.', this._navCtrl);
    } else {
      this._globalMethod.carregarPagina(HistoricoListPage, historico.tipo_agenda, true, this._navCtrl);
    }
  }

  onCarregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  onGerenciar(historico: Historico): void {
    if (!historico.qtde_todos || historico.qtde_todos <= 0) {
      this._globalMethod.mostrarMensagem('Não existem agendas para o histórico selecionado.', this._navCtrl);
    } else {
      let actionSheet = this._actionSheetCtrl.create({
        title: 'Opções',
        buttons: [
          // {
          //   text: 'Excluir Agendas',
          //   role: 'destructive',
          //   icon: !this._platform.is('ios') ? 'trash' : null,
          //   handler: () => {
          //     this.onExcluir(historico);
          //   }
          // },
          {
            text: 'Visualizar Agendas',
            icon: !this._platform.is('ios') ? 'open' : null,
            handler: () => {
              this.onCarregarAgendas(historico);
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

  onExcluir(historico: Historico): void {
    let confirm = this._alertCtrl.create({
      title: 'Excluir',
      message: `Deseja excluir todas agendas de ${historico.tipo_agenda.descricao}?`,
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
    this._tipoAgendaService.list.subscribe((list: ITipoAgenda[]) => { // -- on sucess
      this.historicos = [];
      list.forEach((tipo: ITipoAgenda) => {
        let historico = new Historico();
        historico.qtde_todos = _.keys(_.get(tipo.agenda, `${this._auth.uid || this._auth.userInfo.uid}`)).length;
        historico.tipo_agenda = tipo;
        this.historicos.push(historico);
      });
      // TODO
      this.rows = Array.from(Array(Math.ceil((this.historicos).length / 2)).keys());
    },
      error => { // -- on error
        this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
      });
  }

}
