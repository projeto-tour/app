import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { AuthService } from '../shared/providers/auth';

@Component({
    selector: 'partiu-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
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
