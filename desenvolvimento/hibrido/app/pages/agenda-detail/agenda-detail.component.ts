import { Component, Inject }  from '@angular/core';

import { NavParams, NavController, Modal, Toast } from 'ionic-angular';

import { Usuario, TipoAgenda, GlobalMethodService } from '../shared';
import { AgendaView, AgendaService } from '../agenda';

import { UsuarioView } from '../usuario';

import { PreferenciaPage } from '../preferencia';
import { RotaPage } from '../rota';

@Component({
  templateUrl: 'build/pages/agenda-detail/agenda-detail.component.html'
})
export class AgendaDetailPage {

  titulo: string = "Agenda";
  usuario: UsuarioView;
  tiposAgenda: TipoAgenda[] = [];
  agenda: AgendaView = null;

  private mensagenErro: any;

  constructor(private _navParams: NavParams,
    private _navCtrl: NavController,
    private _service: AgendaService,
    private _globalMethod: GlobalMethodService) {
    this.titulo = _navParams.data.titulo;
    this.agenda = _navParams.data.agenda;
    this.usuario = _navParams.data.usuario;
  }

  ionViewLoaded() {
    this.getTiposDeAgenda();
  }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  confirmar(): void {
    this._globalMethod.carregarPagina(RotaPage, this.agenda, true, this._navCtrl);
  }

  limpar(): void {
    this.agenda = new AgendaView(new Usuario(), new TipoAgenda(), "",
      (new Date()).toDateString(),
      (new Date()).toDateString(),
      (new Date()).toDateString())
  }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  private getTiposDeAgenda() {
    this._service.getTiposDeAgenda()
      .subscribe(
      (data: TipoAgenda[]) => { //-- on sucess
        this.tiposAgenda = data;
      },
      error => { //-- on error
        this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
      },
      () => { //-- on completion
        this.initAgenda(this.agenda);
      }
      );
  }

  private initAgenda(agenda: AgendaView): void {
    if (agenda === null || Object.keys(agenda).length === 0 || agenda.id === 0) {
      this.agenda = new AgendaView(this.usuario,
        this.tiposAgenda[0],
        "",
        (new Date()).toDateString(),
        (new Date()).toDateString(),
        (new Date()).toDateString());
    }
  }

}
