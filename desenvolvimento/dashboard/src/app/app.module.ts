import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MdButtonModule } from '@angular2-material/button';
import { MdProgressBarModule } from '@angular2-material/progress-bar';

import { PolymerElement } from '@vaadin/angular2-polymer';

import { FirebaseModule } from './shared/firebase';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { DashboardModule } from './+dashboard';
import { LoginModule } from './+login';

import { ToastComponent } from './shared/directives/toast/toast.component';
import { ModalComponent } from './shared/directives/modal/modal.component';
import { ProgressBarComponent } from './shared/directives/progress-bar/progress-bar.component';

import { ToastService } from './shared/directives/toast/toast.service';
import { ModalService } from './shared/directives/modal/modal.service';
import { ProgressBarService } from './shared/directives/progress-bar/progress-bar.service';

import { AuthService } from './shared/providers/auth/auth.service';
import { CanActivateAuthGuard } from './shared/providers/auth/can-activate-auth-guard.service';
import { CanActivateUnAuthGuard } from './shared/providers/auth/can-activate-unauth-guard.service';

import { CONFIG_PROVIDERS } from './shared/const';

import { AvaliacaoService } from './shared/providers/avaliacao.service';
import { CaracteristicaService } from './shared/providers/caracteristica.service';
import { ExceptionService } from './shared/providers/exception.service';
import { TipoAgendaService } from './shared/providers/tipo-agenda.service';
import { TipoDadoService } from './shared/providers/tipo-dado.service';
import { TipoPontoInteresseService } from './shared/providers/tipo-ponto-interesse.service';
import { TipoTransporteService } from './shared/providers/tipo-transporte.service';
import { TransporteService } from './shared/providers/transporte.service';

@NgModule({
  declarations: [
    AppComponent,

    ToastComponent,
    ModalComponent,
    ProgressBarComponent,

    PolymerElement('paper-button'),
    PolymerElement('paper-toast'),
    PolymerElement('paper-dialog')
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    MdButtonModule,
    MdProgressBarModule,

    LoginModule,
    DashboardModule,

    FirebaseModule,
    routing
  ],
  providers: [
    AuthService,
    CanActivateAuthGuard,
    CanActivateUnAuthGuard,

    ToastService,
    ModalService,
    ProgressBarService,

    CONFIG_PROVIDERS,
    AvaliacaoService,
    CaracteristicaService,
    ExceptionService,
    TipoAgendaService,
    TipoDadoService,
    TipoPontoInteresseService,
    TipoTransporteService,
    TransporteService
  ],
  entryComponents: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
