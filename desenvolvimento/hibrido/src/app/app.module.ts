import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';

import { AngularFireModule, AuthMethods } from 'angularfire2';

const firebaseConfig = {
  apiKey: 'AIzaSyA-hJN5T3YfItdL5-vWZEHNhEKU0eQx6Lo',
  authDomain: 'partiu-tourism.firebaseapp.com',
  databaseURL: 'https://partiu-tourism.firebaseio.com',
  storageBucket: 'partiu-tourism.appspot.com',
};

const firebaseAuthConfig = {
  method: AuthMethods.Popup,
  remember: 'default'
};

import { PartiuApp } from './app.component';

export const configObject = {
  backButtonText: 'Voltar',
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Juno', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthShortNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'],
  dayShortNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
}

import { AgendaPage } from '../pages/agenda/agenda.component';
import { AgendaDetailPage } from '../pages/agenda/agenda-detail.component';
import { BagagemPage } from '../pages/bagagem/bagagem.component';
import { CompartilharPage } from '../pages/compartilhar/compartilhar.component';
import { ConfiguracaoPage } from '../pages/configuracao/configuracao.component';
import { DesenvolvimentoPage } from '../pages/desenvolvimento/desenvolvimento.component';
import { HistoricoPage } from '../pages/historico/historico.component';
import { HistoricoListPage } from '../pages/historico/historico-list.component';
import { MapaPage } from '../pages/mapa/mapa.component';
import { NotificacaoPage } from '../pages/notificacao/notificacao.component';
import { PontoInteressePage } from '../pages/ponto-interesse/ponto-interesse.component';
import { PreferenciaPage } from '../pages/preferencia/preferencia.component';
import { PrincipalPage } from '../pages/principal/principal.component';
import { RotaPage } from '../pages/rota/rota.component';
import { RotaDetailPage } from '../pages/rota/rota-detail.component';
import { SobrePage } from '../pages/sobre/sobre.component';
import { TutorialPage } from '../pages/tutorial/tutorial.component';
import { UsuarioLoginPage } from '../pages/usuario/usuario-login.component';
import { UsuarioProfilePage } from '../pages/usuario/usuario-profile.component';
import { UsuarioSignUpPage } from '../pages/usuario/usuario-signup.component';

import { ControlMessagesComponent } from '../components/control-message.component';
// import { EmailValidatorDirective } from '../components/email-validator.directive';
import { GoogleplaceDirective } from '../components/google-place.directive';

import { AgendaFilterPipe } from '../pipes/agenda-filter.pipe';
import { NotificacaoFilterPipe } from '../pipes/notificacao-filter.pipe';

import { FirebaseAuthService } from '../providers/auth/firebase-auth.service';
import { ConnectivityService } from '../providers/connectivity/connectivity.service';
import { AgendaService } from '../providers/data/agenda.service';
import { MenuDataService } from '../providers/data/menu-data.service';
import { NotificacaoService } from '../providers/data/notificacao.service';
import { PontoInteresseService } from '../providers/data/ponto-interesse.service';
import { PreferenciaUsuarioService } from '../providers/data/preferencia-usuario.service';
import { RotaService } from '../providers/data/rota.service';
import { TipoAgendaService } from '../providers/data/tipo-agenda.service';
import { TipoPontoInteresseService } from '../providers/data/tipo-ponto-interesse.service';
import { TransporteService } from '../providers/data/transporte.service';
import { TutorialDataService } from '../providers/data/tutorial-data.service';
import { UsuarioService } from '../providers/data/usuario.service';
import { GlobalMethodService } from '../providers/global/global-method.service';
import { GlobalVariableService } from '../providers/global/global-variable.service';
import { ValidationService } from '../providers/global/validation.service';

import { CONFIG_PROVIDERS } from '../pages/shared/config';

@NgModule({
  declarations: [
    PartiuApp,
    AgendaPage,
    AgendaDetailPage,
    BagagemPage,
    CompartilharPage,
    ConfiguracaoPage,
    DesenvolvimentoPage,
    HistoricoPage,
    HistoricoListPage,
    MapaPage,
    NotificacaoPage,
    PontoInteressePage,
    PreferenciaPage,
    PrincipalPage,
    RotaPage,
    RotaDetailPage,
    SobrePage,
    TutorialPage,
    UsuarioLoginPage,
    UsuarioProfilePage,
    UsuarioSignUpPage,
    ControlMessagesComponent,

    // EmailValidatorDirective,
    GoogleplaceDirective,

    AgendaFilterPipe,
    NotificacaoFilterPipe
  ],
  imports: [
    IonicModule.forRoot(PartiuApp, { configObject }),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    // FormsModule,
    // HttpModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    PartiuApp,
    AgendaPage,
    AgendaDetailPage,
    BagagemPage,
    CompartilharPage,
    ConfiguracaoPage,
    DesenvolvimentoPage,
    HistoricoPage,
    HistoricoListPage,
    MapaPage,
    NotificacaoPage,
    PontoInteressePage,
    PreferenciaPage,
    PrincipalPage,
    RotaPage,
    RotaDetailPage,
    SobrePage,
    TutorialPage,
    UsuarioLoginPage,
    UsuarioProfilePage,
    UsuarioSignUpPage
  ],
  providers: [
    FirebaseAuthService,
    ConnectivityService,
    AgendaService,
    MenuDataService,
    NotificacaoService,
    PontoInteresseService,
    PreferenciaUsuarioService,
    RotaService,
    TipoAgendaService,
    TipoPontoInteresseService,
    TransporteService,
    TutorialDataService,
    UsuarioService,
    GlobalMethodService,
    GlobalVariableService,
    ValidationService,
    CONFIG_PROVIDERS
  ]
})
export class AppModule { }
