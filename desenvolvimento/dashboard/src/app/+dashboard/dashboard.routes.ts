import { RouterConfig } from '@angular/router';

import { DashboardComponent } from './';
import { HomeComponent } from '../+home';
import { CaracteristicaComponent } from '../+caracteristica';
import { TipoAgendaComponent } from '../+tipo-agenda';
import { TipoDadoComponent } from '../+tipo-dado';
import { TipoPontoInteresseComponent } from '../+tipo-ponto-interesse';
import { TipoTransporteComponent } from '../+tipo-transporte';
import { TransporteComponent } from '../+transporte';

import { CanActivateAuthGuard } from '../routing';

export const ChildRoutes: RouterConfig = [
  { path: 'home', component: HomeComponent },
  { path: 'caracteristica', component: CaracteristicaComponent },
  { path: 'tipodeagenda', component: TipoAgendaComponent },
  { path: 'tipodedado', component: TipoDadoComponent },
  { path: 'tipodepontodeinteresse', component: TipoPontoInteresseComponent },
  { path: 'tipodetrasporte', component: TipoTransporteComponent },
  { path: 'trasporte', component: TransporteComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const DashboardRoutes: RouterConfig = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [ CanActivateAuthGuard ], children: ChildRoutes }
];
