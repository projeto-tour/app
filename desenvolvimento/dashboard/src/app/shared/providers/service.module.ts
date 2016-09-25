import { NgModule } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { CanActivateAuthGuard } from './auth/can-activate-auth-guard.service';
import { CanActivateUnAuthGuard } from './auth/can-activate-unauth-guard.service';

import { ToastService } from '../directives/toast/toast.service';
import { ModalService } from '../directives/modal/modal.service';
import { ProgressBarService } from '../directives/progress-bar/progress-bar.service';

import { AvaliacaoService } from './avaliacao.service';
import { CaracteristicaService } from './caracteristica.service';
import { CaracteristicaTipoPontoInteresseService } from './caracteristica-tipo-ponto-interesse.service';
import { ExceptionService } from './exception.service';
import { TipoAgendaService } from './tipo-agenda.service';
import { TipoDadoService } from './tipo-dado.service';
import { TipoPontoInteresseService } from './tipo-ponto-interesse.service';
import { TipoTransporteService } from './tipo-transporte.service';
import { TransporteService } from './transporte.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [],
})
export class ServiceModule {

  static forRoot() {
    return {
      ngModule: ServiceModule,
      providers: [
        AuthService,
        CanActivateAuthGuard,
        CanActivateUnAuthGuard,

        ToastService,
        ModalService,
        ProgressBarService,

        AvaliacaoService,
        CaracteristicaService,
        CaracteristicaTipoPontoInteresseService,
        ExceptionService,
        TipoAgendaService,
        TipoDadoService,
        TipoPontoInteresseService,
        TipoTransporteService,
        TransporteService
      ]
    };
  }

}
