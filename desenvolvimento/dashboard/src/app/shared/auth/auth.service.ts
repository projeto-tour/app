import { Injectable, provide } from '@angular/core';
import { AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

import { ExceptionService } from '../providers/exception.service';
import { ProgressBarService } from '../providers/progress-bar.service';

@Injectable()
export class AuthService {

    private authState: FirebaseAuthState = null;

    public redirectUrl: string = 'dashboard';
    public title: string = 'Dashboard';

    constructor(
        public _auth: FirebaseAuth,
        private _exceptionService: ExceptionService,
        private _progressBarService: ProgressBarService) {
        _progressBarService.show();
        _auth.subscribe((state: FirebaseAuthState) => {
                _progressBarService.hide();
                this.authState = state;
            },
            error => { // On error
                _progressBarService.hide();
                _exceptionService.catchBadResponse(<any>error);
            },
            () => { // On completion
                // console.log('authState:[UserInfo] ' + JSON.stringify(this.authState.auth));
            });
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    get id(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    get user(): string {
        return this.authenticated ? this.authState.auth.email || this.authState.auth.providerData[0].email : '';
    }

    signIn(email: string, password: string): firebase.Promise<FirebaseAuthState> {
        this._progressBarService.show();
        return this._auth.login({ email: email, password: password }, {
                provider: AuthProviders.Password,
                method: AuthMethods.Password
            })
            .then((auth) => {
                this._progressBarService.hide();
            })
            .catch((error) => {
                this._progressBarService.hide();
                this._exceptionService.catchBadResponse(error);
            });
    }

    signOut(): void {
        this._auth.logout();
    }

}

export var AUTH_PROVIDERS: Array<any> = [
    provide(AuthService, { useClass: AuthService })
];
