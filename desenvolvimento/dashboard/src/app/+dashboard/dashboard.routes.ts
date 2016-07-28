import { RouterConfig } from '@angular/router';

import { DashboardComponent } from './';
import { HomeComponent } from '../+home';
import { CaracteristicaComponent } from '../+caracteristica';
import { TipoAgendaComponent } from '../+tipo-agenda';
import { TipoDadoComponent } from '../+tipo-dado';
import { TipoPontoInteresseComponent } from '../+tipo-ponto-interesse';
import { TipoTransporteComponent } from '../+tipo-transporte';
import { TransporteComponent } from '../+transporte';

import { CanActivateAuthGuard, CanDeactivateGuard } from '../routing';

export const ChildRoutes: RouterConfig = [
  { path: 'home', component: HomeComponent },
  { path: 'caracteristica', component: CaracteristicaComponent, canDeactivate: [ CanDeactivateGuard ] },
  { path: 'tipodeagenda', component: TipoAgendaComponent, canDeactivate: [ CanDeactivateGuard ] },
  { path: 'tipodedado', component: TipoDadoComponent, canDeactivate: [ CanDeactivateGuard ] },
  { path: 'tipodepontodeinteresse', component: TipoPontoInteresseComponent, canDeactivate: [ CanDeactivateGuard ] },
  { path: 'tipodetrasporte', component: TipoTransporteComponent, canDeactivate: [ CanDeactivateGuard ] },
  { path: 'trasporte', component: TransporteComponent, canDeactivate: [ CanDeactivateGuard ] },
  { path: '**', pathMatch:'full', redirectTo: 'home' }
];

export const DashboardRoutes: RouterConfig = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [ CanActivateAuthGuard ], children: ChildRoutes }
];