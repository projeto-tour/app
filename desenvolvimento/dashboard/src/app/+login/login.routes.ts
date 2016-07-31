import { RouterConfig } from '@angular/router';

import { LoginComponent } from './';
import { CanActivateUnAuthGuard } from '../routing';

export const LoginRoutes: RouterConfig = [
  { path: 'login', component: LoginComponent, canActivate: [ CanActivateUnAuthGuard ] }
];
