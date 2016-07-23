import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
//import { MD_CHECKBOX_DIRECTIVES } from '@angular2-material/checkbox';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';
//import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
//import { MD_RADIO_DIRECTIVES } from '@angular2-material/radio';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
//import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { AuthService } from '../shared';

@Component({
    moduleId: module.id,
    selector: 'partiu-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
        MD_BUTTON_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        //MD_CHECKBOX_DIRECTIVES,
        MD_GRID_LIST_DIRECTIVES,
        MD_ICON_DIRECTIVES,
        MD_INPUT_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MD_PROGRESS_BAR_DIRECTIVES,
        //MD_RADIO_DIRECTIVES,
        MD_SIDENAV_DIRECTIVES,
        //MD_SLIDE_TOGGLE_DIRECTIVES,
        MD_TABS_DIRECTIVES,
        MD_TOOLBAR_DIRECTIVES,
        MdIcon
    ],
    providers: [
        HTTP_PROVIDERS,
        MdIconRegistry
    ]
})
export class DashboardComponent implements OnInit {

    title = 'Dashboard';
    user: string = '';

    constructor(
        public _authService: AuthService,
        private _router: Router,
        private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this.user = this._authService.getUser();
    }

    logout() {
        this._authService.logout();
        window.location.replace('/');
    }

}
