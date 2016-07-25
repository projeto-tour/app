import { RouterConfig } from '@angular/router';

import { DashboardComponent } from './';
import { HomeComponent } from '../+home';
import { TipoAgendaComponent } from '../+tipo-agenda';
import { CanActivateAuthGuard, CanDeactivateGuard } from '../routing';

export const ChildRoutes: RouterConfig = [
  { path: 'home', component: HomeComponent },
  { path: 'tipodeagenda', component: TipoAgendaComponent, canDeactivate: [ CanDeactivateGuard ] },
  { path: '**', pathMatch:'full', redirectTo: 'home' }
];

export const DashboardRoutes: RouterConfig = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [ CanActivateAuthGuard ], children: ChildRoutes }
];