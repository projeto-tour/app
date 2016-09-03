import { Component }  from '@angular/core';

import { NavParams, NavController, AlertController } from 'ionic-angular';
import { InAppBrowser }  from 'ionic-native';

import { Observable } from 'rxjs/Observable';

import { NotificacaoFilterPipe } from './';

import { GlobalMethodService, INotificacao } from '../shared';
import { NotificacaoService } from '../../providers/data/notificacao.service';

import { PreferenciaPage } from '../preferencia';
import { DesenvolvimentoPage } from '../desenvolvimento';

@Component({
  templateUrl: 'build/pages/notificacao/notificacao.component.html',
  pipes: [NotificacaoFilterPipe]
})
export class NotificacaoPage {

  titulo: string = 'Notificações';
  dados: any;
  filtro: string = '';
  notificacoes: Observable<any>;
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _service: NotificacaoService,
    public _globalMethod: GlobalMethodService,
    public _alertCtrl: AlertController) {
    this.dados = this._navParams.data;
    this.notificacoes = _service.getMock();
  }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  marcarComoLida(notificacao: INotificacao): void {
  }

  visualizar(notificacao: INotificacao): void {
    new InAppBrowser(notificacao.url, '_system');
  }

  excluir(notificacao: INotificacao): void {
    let confirm = this._alertCtrl.create({
      title: 'Excluir',
      message: 'Deseja excluir essa notificação?',
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

}
