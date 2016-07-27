import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
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

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this.user = this._authService.user;
    }

    logout() {
        this._authService.signOut();
        window.location.replace('/');
    }

}
