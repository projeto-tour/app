import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable }    from 'rxjs/Observable';

import { AuthService } from '../shared';

@Injectable()
export class CanActivateUnAuthGuard implements CanActivate {

    constructor(
        private _authService: AuthService,
        private _router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this._authService._auth
            .take(1)
            .map(authState => !authState)
            .do(unauthenticated => {
                if (!unauthenticated) {
                    this._authService.redirectUrl = state.url;
                    this._router.navigate(['/dashboard'], { queryParams: { redirectTo: state.url } });
                }
            });
    }
}
