import { Component }  from '@angular/core';
import { NgClass, DatePipe } from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

import { NavController, ActionSheet, Platform, Alert } from 'ionic-angular';

import { AgendaFilterPipe } from './';
import { AgendaService, IAgenda } from '../../providers/agendas';
import { GlobalMethodService } from '../shared';
import { PreferenciaPage } from '../preferencia';
import { MapaPage } from '../mapa';
import { RotaPage } from '../rota';
import { AgendaDetailPage } from '../agenda-detail';

@Component({
  templateUrl: 'build/pages/agenda/agenda.component.html',
  pipes: [AgendaFilterPipe],
  directives: [NgClass]
})
export class AgendaPage {

  titulo: string = "Agendas";
  filtro: string = '';
  agendas: IAgenda[] = [];
  mensagenErro: any = null;

  constructor(
    private _navCtrl: NavController,
    private _platform: Platform,
    public _globalMethod: GlobalMethodService,
    private _agendaService: AgendaService) {
  }

  ionViewLoaded() {
    this.getAgendas();
    this._agendaService.filterAgendas((new DatePipe()).transform(new Date(), 'yyyy-MM-dd'));
  }

  marcarComoFavorito(agenda: IAgenda): void {
    agenda.favorito = !agenda.favorito;
    this._agendaService.updateAgenda(agenda, { favorito: agenda.favorito });
  }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  carregarMapa(agenda: IAgenda): void {
    this._navCtrl.push(MapaPage, agenda);
  }

  carregarRotas(agenda: IAgenda): void {
    this._globalMethod.carregarPagina(RotaPage, agenda, true, this._navCtrl);
  }

  editar(agenda: IAgenda): void {
    this._globalMethod.carregarPagina(AgendaDetailPage, { titulo: 'Editar', agenda: agenda }, true, this._navCtrl);
  }

  incluir(): void {
    this._globalMethod.carregarPagina(AgendaDetailPage, { titulo: 'Criar', agenda: null }, true, this._navCtrl);
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
          text: 'Editar',
          icon: !this._platform.is('ios') ? 'create' : null,
          handler: () => {
            this.editar(agenda);
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
            //-- TODO Otimizar a remoção de agenda da lista local
            this._agendaService.removeAgenda(agenda).then(() => {
              this.getAgendas();
            });
          }
        }
      ]
    });
    this._navCtrl.present(confirm);
  }

  private getAgendas(): void {
    this._agendaService.agendas
      .subscribe(
      (data: IAgenda[]) => { //-- on sucess
        this.agendas = data;
        //-- TODO Calcular a kilometragem das rotas de agenda
        //this.agendas.forEach(data => { data.distancia = this._agendaServiceRota.calcularKilometragem(idAgenda); })
      },
      error => { //-- on error
        this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
      });
  }

}
