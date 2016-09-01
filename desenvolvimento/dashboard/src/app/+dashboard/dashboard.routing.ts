import { Routes, RouterModule }  from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../+home/home.component';
import { AvaliacaoComponent } from '../+avaliacao/avaliacao.component';
import { CaracteristicaComponent } from '../+caracteristica/caracteristica.component';
import {
    CaracteristicaTipoPontoInteresseComponent
} from '../+caracteristica-tipo-ponto-interesse/caracteristica-tipo-ponto-interesse.component';
import { TipoAgendaComponent } from '../+tipo-agenda/tipo-agenda.component';
import { TipoDadoComponent } from '../+tipo-dado/tipo-dado.component';
import { TipoPontoInteresseComponent } from '../+tipo-ponto-interesse/tipo-ponto-interesse.component';
import { TipoTransporteComponent } from '../+tipo-transporte/tipo-transporte.component';
import { TransporteComponent } from '../+transporte/transporte.component';

import { CanActivateAuthGuard } from '../shared/providers/auth/can-activate-auth-guard.service';

const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [
            CanActivateAuthGuard
        ],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'avaliacao', component: AvaliacaoComponent },
            { path: 'caracteristica', component: CaracteristicaComponent },
            { path: 'caracteristica_tipo_ponto_interesse', component: CaracteristicaTipoPontoInteresseComponent },
            { path: 'tipodeagenda', component: TipoAgendaComponent },
            { path: 'tipodedado', component: TipoDadoComponent },
            { path: 'tipodepontodeinteresse', component: TipoPontoInteresseComponent },
            { path: 'tipodetrasporte', component: TipoTransporteComponent },
            { path: 'trasporte', component: TransporteComponent },
            { path: '**', pathMatch: 'full', redirectTo: 'home' }
        ]
    }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
