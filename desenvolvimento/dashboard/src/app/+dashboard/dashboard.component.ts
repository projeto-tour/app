import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import {
    AuthService,
    MdlDirective
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
        MdIcon,
        MdlDirective
    ],
    providers: [
        MdIconRegistry
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

    constructor(public _authService: AuthService) {
    }

    ngOnInit() {
        this._authService.title = 'Dashboard';
    }

    logout() {
        this._authService.signOut();
        window.location.replace('/');
    }

}
