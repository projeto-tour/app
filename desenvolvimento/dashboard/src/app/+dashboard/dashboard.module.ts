import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdButtonModule } from '@angular2-material/button';
import { MdButtonToggleModule } from '@angular2-material/button-toggle';
import { MdCardModule } from '@angular2-material/card';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdIconModule } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list';
import { MdMenuModule } from '@angular2-material/menu';
import { MdProgressBarModule } from '@angular2-material/progress-bar';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdRadioModule } from '@angular2-material/radio';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdTabsModule } from '@angular2-material/tabs';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdTooltipModule } from '@angular2-material/tooltip';

import { PolymerElement } from '@vaadin/angular2-polymer';

import { MdlDirective } from '../shared/directives/mdl.directive';
import { AutofocusDirective } from '../shared/directives/autofocus.directive';

import { CadastroComponent } from '../shared/directives/cadastro/cadastro.component';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../+home/home.component';
import { AvaliacaoComponent } from '../+avaliacao/avaliacao.component';
import { CaracteristicaComponent } from '../+caracteristica/caracteristica.component';
import { TipoAgendaComponent } from '../+tipo-agenda/tipo-agenda.component';
import { TipoDadoComponent } from '../+tipo-dado/tipo-dado.component';
import { TipoPontoInteresseComponent } from '../+tipo-ponto-interesse/tipo-ponto-interesse.component';
import { TipoTransporteComponent } from '../+tipo-transporte/tipo-transporte.component';
import { TransporteComponent } from '../+transporte/transporte.component';

import { dashboardRouting } from './dashboard.routing';

@NgModule({
    declarations: [
        MdlDirective,
        AutofocusDirective,

        CadastroComponent,

        DashboardComponent,
        HomeComponent,
        AvaliacaoComponent,
        CaracteristicaComponent,
        TipoAgendaComponent,
        TipoDadoComponent,
        TipoPontoInteresseComponent,
        TipoTransporteComponent,
        TransporteComponent,

        PolymerElement('vaadin-grid'),
        PolymerElement('vaadin-combo-box'),
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdProgressBarModule,
        MdProgressCircleModule,
        MdRadioModule,
        MdSidenavModule,
        MdTabsModule,
        MdToolbarModule,
        MdGridListModule,
        MdTooltipModule,

        dashboardRouting
    ],
    providers: [
    ]
})
export class DashboardModule { }
