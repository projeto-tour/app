import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { 
    AuthService, 
    CaracteristicaService, 
    TipoAgendaService, 
    TipoDadoService, 
    TipoPontoInteresseService, 
    TipoTransporteService, 
    TransporteService 
} from '../shared';

@Component({
    moduleId: module.id,
    selector: 'partiu-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
        MD_BUTTON_DIRECTIVES,
        MD_ICON_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MD_SIDENAV_DIRECTIVES,
        MD_TOOLBAR_DIRECTIVES,
        MdIcon
    ],
    providers: [
        HTTP_PROVIDERS,
        MdIconRegistry
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

    title = 'Dashboard';
    user: string = '';
    
    countCaracteristica: number = 0;
    countTipoAgenda: number = 0;
    countTipoDado: number = 0;
    countTipoPontoInteresse: number = 0;
    countTipoTransporte: number = 0;
    countTransporte: number = 0;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _caracteristicaService: CaracteristicaService, 
        private _tipoAgendaService: TipoAgendaService, 
        private _tipoDadoService: TipoDadoService, 
        private _tipoPontoInteresseService: TipoPontoInteresseService, 
        private _tipoTransporteService: TipoTransporteService, 
        private _transporteService: TransporteService) {
    }

    ngOnInit() {
        this.user = this._authService.user;

        this._caracteristicaService.list.subscribe((data: any[]) => {
            this.countCaracteristica = data.length;
        });

        this._tipoAgendaService.list.subscribe((data: any[]) => {
            this.countTipoAgenda = data.length;
        });

        this._tipoDadoService.list.subscribe((data: any[]) => {
            this.countTipoDado = data.length;
        });

        this._tipoPontoInteresseService.list.subscribe((data: any[]) => {
            this.countTipoPontoInteresse = data.length;
        });

        this._tipoTransporteService.list.subscribe((data: any[]) => {
            this.countTipoTransporte = data.length;
        });

        this._transporteService.list.subscribe((data: any[]) => {
            this.countTransporte = data.length;
        });
    }

    logout() {
        this._authService.signOut();
        window.location.replace('/');
    }

}
