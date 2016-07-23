import { RouterConfig } from '@angular/router';

import { DashboardComponent } from './';
import { HomeComponent } from '../home';
import { CanActivateAuthGuard } from '../routing';

export const ChildRoutes: RouterConfig = [
  { path: '**', pathMatch:'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent }
];

export const DashboardRoutes: RouterConfig = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [ CanActivateAuthGuard ], children: ChildRoutes }
];