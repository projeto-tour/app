import { Component, Inject }  from '@angular/core';
import { DatePipe } from '@angular/common';

import { NavParams, NavController, Modal, Toast } from 'ionic-angular';

import { Usuario } from '../../providers/usuarios';
import { AgendaService, TipoAgendaService, IAgenda, Agenda, ITipoAgenda, TipoAgenda } from '../../providers/agendas';
import { GlobalMethodService } from '../shared';
import { PreferenciaPage } from '../preferencia';
import { RotaPage } from '../rota';

@Component({
  templateUrl: 'build/pages/agenda-detail/agenda-detail.component.html'
})
export class AgendaDetailPage {

  titulo: string = "Agenda";
  agenda: IAgenda;
  tiposDeAgenda: ITipoAgenda[];
  isNovaAgenda: boolean = true;

  private mensagenErro: any;

  constructor(private _navParams: NavParams,
    private _navCtrl: NavController,
    private _globalMethod: GlobalMethodService,
    private _agendaService: AgendaService,
    public _tipoAgendaService: TipoAgendaService) {
    this.titulo = _navParams.data.titulo;
    this.agenda = _navParams.data.agenda;
    this.isNovaAgenda = this.agenda === null || Object.keys(this.agenda).length === 0;
    this._tipoAgendaService.tipos.subscribe((tipos: ITipoAgenda[]) => {
      this.tiposDeAgenda = tipos;
      if (this.isNovaAgenda) {
        this.initAgenda();
      }
    });
  }

  confirmar(): void {
    if (this.isNovaAgenda) {
      this.criar();
    } else {
      this.atualizar();
    }
  }

  limpar(): void {
    this.initAgenda();
  }

  private criar() {
    this._agendaService.createAgenda(this.setAgenda())
      .then((agenda: IAgenda) => {
        this._globalMethod.mostrarMensagem('Dados de agenda foram salvos com êxito.', this._navCtrl);
        this._globalMethod.carregarPagina(RotaPage, agenda, true, this._navCtrl);
      })
      .catch(this.handleError);
  }

  private atualizar() {
    this._agendaService.updateAgenda(this.agenda, this.setAgenda())
      .then((agenda: IAgenda) => {
        this._globalMethod.mostrarMensagem('Dados de agenda foram atualizados com êxito.', this._navCtrl);
        this._globalMethod.carregarPagina(RotaPage, agenda, true, this._navCtrl);
      })
      .catch(this.handleError);
  }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  private initAgenda() {
    this.agenda = new Agenda();
    this.agenda.tipoAgenda = this.tiposDeAgenda && this.tiposDeAgenda.length > 0 ? this.tiposDeAgenda[0] : new TipoAgenda();
    this.agenda.dataInicio = (new DatePipe()).transform(new Date(), 'yyyy-MM-dd');
    this.agenda.dataFim = (new DatePipe()).transform(new Date(), 'yyyy-MM-dd');
    this.agenda.dataCriacao = (new DatePipe()).transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  private setAgenda(): any {
    var tipo = this.tiposDeAgenda.filter(tipo => tipo.$key === this.agenda.tipoAgenda.id)[0];
    var agenda = {
      descricao: this.agenda.descricao,
      dataInicio: this.agenda.dataInicio,
      dataFim: this.agenda.dataFim,
      distancia: this.agenda.distancia,
      favorito: this.agenda.favorito,
      tipoAgenda: {
        id: tipo.$key,
        descricao: tipo.descricao
      },
      dataCriacao: this.agenda.dataCriacao
    }
    return agenda;
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }

}
