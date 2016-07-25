import { provideRouter, RouterConfig } from '@angular/router';

import { CanActivateAuthGuard, CanActivateUnAuthGuard, CanDeactivateGuard  } from './';
import { DashboardRoutes } from '../+dashboard';
import { LoginRoutes } from '../+login';

export const AppRoutes: RouterConfig = [
  ...LoginRoutes,
  ...DashboardRoutes,
  { path: '**', pathMatch:'full', redirectTo: '/login' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(AppRoutes),
  CanActivateAuthGuard,
  CanActivateUnAuthGuard,
  CanDeactivateGuard
];
