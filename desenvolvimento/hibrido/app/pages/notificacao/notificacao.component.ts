import { Component }  from '@angular/core';

import { NavParams, NavController, AlertController } from 'ionic-angular';
import { InAppBrowser }  from 'ionic-native';

import { GlobalMethodService } from '../shared';

import { Notificacao, NotificacaoFilterPipe, NotificacaoService } from './';

import { PreferenciaPage } from '../preferencia';
import { DesenvolvimentoPage } from '../desenvolvimento';

@Component({
  templateUrl: 'build/pages/notificacao/notificacao.component.html',
  pipes: [NotificacaoFilterPipe]
})
export class NotificacaoPage {

  titulo: string = 'Notificações';
  notificacoes: Notificacao[] = [];
  dados: any;
  filtro: string = '';
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _service: NotificacaoService,
    public _globalMethod: GlobalMethodService,
    public _alertCtrl: AlertController) {
    this.dados = this._navParams.data;
  }

  ionViewLoaded() {
    this.getNotificacoes();
  }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  marcarComoLida(): void {
  }

  visualizar(notificacao: Notificacao): void {
    new InAppBrowser(`http://placehold.it/320?text${notificacao.descricao}`, '_system');
    // this._globalMethod.carregarPagina(DesenvolvimentoPage, { title: 'Detalhes da Notificação' }, true, this._navCtrl);
  }

  atualizar(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  excluir(notificacao: Notificacao): void {
    let confirm = this._alertCtrl.create({
      title: 'Excluir',
      message: 'Deseja realmente excluir essa notificação?',
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

  private getNotificacoes(): void {
    this._service.getNotificacoes()
      .subscribe(
      (data: Notificacao[]) => { // -- on sucess
        this.notificacoes = data;
      },
      error => { // -- on error
        this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
      },
      () => { // -- on completion

      }
      );
  }

}
