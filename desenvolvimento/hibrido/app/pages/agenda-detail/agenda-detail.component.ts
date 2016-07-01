import { Component, Inject }  from '@angular/core';

import { NavParams, NavController, Modal, Toast } from 'ionic-angular';

import { Usuario } from '../../providers/usuarios';
import { AgendaService, Agenda, TipoAgenda } from '../../providers/agendas';
import { GlobalMethodService } from '../shared';

import { PreferenciaPage } from '../preferencia';
import { RotaPage } from '../rota';

@Component({
  templateUrl: 'build/pages/agenda-detail/agenda-detail.component.html'
})
export class AgendaDetailPage {

  titulo: string = "Agenda";
  agenda: Agenda = null;

  private mensagenErro: any;

  constructor(private _navParams: NavParams,
    private _navCtrl: NavController,
    private _service: AgendaService,
    private _globalMethod: GlobalMethodService) {
    this.titulo = _navParams.data.titulo;
    this.agenda = _navParams.data.agenda;
  }

  ionViewLoaded() {
    this.getTiposDeAgenda();
  }

  confirmar(): void {
    this._globalMethod.carregarPagina(RotaPage, this.agenda, true, this._navCtrl);
  }

  limpar(): void {
    // this.agenda = new Agenda()
  }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  private getTiposDeAgenda() {
    // this._service.getTiposDeAgenda()
    //   .subscribe(
    //   (data: TipoAgenda[]) => { //-- on sucess
    //     this.tiposAgenda = data;
    //   },
    //   error => { //-- on error
    //     this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
    //   },
    //   () => { //-- on completion
    //     this.initAgenda(this.agenda);
    //   }
    //   );
  }

  private initAgenda(agenda: Agenda): void {
    // if (agenda === null || Object.keys(agenda).length === 0 || agenda.id === 0) {
    //   this.agenda = new Agenda(this.usuario,
    //     this.tiposAgenda[0],
    //     "",
    //     (new Date()).toDateString(),
    //     (new Date()).toDateString(),
    //     (new Date()).toDateString());
    // }
  }

}
