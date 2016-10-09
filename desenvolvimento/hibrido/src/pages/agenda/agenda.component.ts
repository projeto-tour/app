import { Component }  from '@angular/core';

import { NavController, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { InAppBrowser }  from 'ionic-native';

// import { clone, get, keys } from 'lodash';
import _ from 'lodash';
import moment from 'moment';

import { GlobalMethodService } from '../../providers/global/global-method.service';
import { AgendaService } from '../../providers/data/agenda.service';
import { TipoAgendaService } from '../../providers/data/tipo-agenda.service';

import { PreferenciaPage } from '../preferencia';
import { RotaPage } from '../rota';
import { AgendaDetailPage } from './agenda-detail.component';

import { IAgenda } from '../shared';

@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.component.html'
})
export class AgendaPage {

  titulo: string = 'Agendas';
  filtro: string = '';
  mensagenErro: any = null;

  constructor(
    public _navCtrl: NavController,
    public _platform: Platform,
    public _globalMethod: GlobalMethodService,
    public _agendaService: AgendaService,
    public _tipoAgendaService: TipoAgendaService,
    public _alertCtrl: AlertController,
    public _actionSheetCtrl: ActionSheetController) { }

  ionViewDidLoad() {
    this._agendaService.filterByDate(moment().format('YYYY-MM-DD'), false);
  }

  onMarcarComoFavorito(agenda: IAgenda): void {
    agenda.favorito = !agenda.favorito;
    this._agendaService.update(agenda, {
      favorito: agenda.favorito
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

  editar(agenda: IAgenda): void {
    this._globalMethod.carregarPagina(AgendaDetailPage, {
      titulo: 'Editar',
      agenda: _.clone(agenda)
    }, true, this._navCtrl);
  }

  onIncluir(): void {
    this._globalMethod.carregarPagina(AgendaDetailPage, {
      titulo: 'Criar',
      agenda: null
    }, true, this._navCtrl);
  }

  onGerenciar(agenda: IAgenda): void {
    let actionSheet = this._actionSheetCtrl.create({
      title: 'Opções',
      buttons: [{
        text: 'Excluir',
        role: 'destructive',
        icon: !this._platform.is('ios') ? 'trash' : null,
        handler: () => {
          this.onExcluir(agenda);
        }
      }, {
          text: 'Editar',
          icon: !this._platform.is('ios') ? 'create' : null,
          handler: () => {
            this.editar(agenda);
          }
        },
        // {
        //   text: 'Compartilhar',
        //   icon: !this._platform.is('ios') ? 'share' : null,
        //   handler: () => {
        //     // -- TODO
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
    if (_.keys(_.get(agenda, 'rota', '')).length > 0) {
      this._globalMethod.mostrarMensagem(`Agenda ${agenda.descricao} possui rotas e não pode ser excluído.`, this._navCtrl);
    } else {
      // this.excluirAgenda(agenda);
      let confirm = this._alertCtrl.create({
        title: 'Excluir',
        message: `Deseja excluir agenda ${agenda.descricao}?`,
        buttons: [{
          text: 'Não',
          handler: () => {
            console.log('Não clicked');
          }
        }, {
            text: 'Sim',
            handler: () => {
              this.excluirAgenda(agenda);
            }
          }]
      });
      confirm.present();
    }
  }

  excluirAgenda(agenda: IAgenda): void {
    this._tipoAgendaService.setAgenda(agenda.tipo_agenda, JSON.parse(`{"${agenda.$key}": null }`))
      .then(data => {
        return this._agendaService.remove(agenda.$key);
      }).then(data => {
        return this._agendaService.filterByDate(moment().format('YYYY-MM-DD'), false);
      }).then(data => {
        this._globalMethod.mostrarMensagem(`Agenda ${agenda.descricao} foi excluído com êxito.`, this._navCtrl);
      }).catch(this.handleError);
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }

}
