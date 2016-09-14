import { Component }  from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AgendaPage } from '../agenda';
import { MapaPage } from '../mapa';
import { HistoricoPage } from '../historico';
import { PontoInteressePage } from '../ponto-interesse';
// import { NotificacaoPage } from '../notificacao';

import { PreferenciaUsuarioService } from '../../providers/data/preferencia-usuario.service';

@Component({
  templateUrl: 'build/pages/principal/principal.component.html'
})
export class PrincipalPage {

  selectedIndex: number;
  preferenciaUsuario: number = 0;

  tab1Root: any = AgendaPage;
  tab2Root: any = MapaPage;
  tab3Root: any = HistoricoPage;
  tab4Root: any = PontoInteressePage;

  constructor(
    public _navParams: NavParams,
    public _preferenciaUsuarioService: PreferenciaUsuarioService) {
    this.selectedIndex = _navParams.data.tabIndex || 0;
    _preferenciaUsuarioService.list.subscribe((list: any[]) => {
      this.preferenciaUsuario = list.length || 0;
    });
  }

}
