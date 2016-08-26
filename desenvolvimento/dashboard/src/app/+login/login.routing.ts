import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { CanActivateUnAuthGuard } from '../shared/providers/auth/can-activate-unauth-guard.service';

export const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [
            CanActivateUnAuthGuard
        ]
    }
];

export const loginRouting = RouterModule.forChild(loginRoutes);
