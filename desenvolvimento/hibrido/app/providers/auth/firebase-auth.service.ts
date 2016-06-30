import { Injectable } from '@angular/core';
import { AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { Usuario } from '../usuarios/usuario.model';
import { Endereco } from '../usuarios/endereco.model';

@Injectable()
export class FirebaseAuthService {
    authState: FirebaseAuthState = null;

    constructor(public _auth: FirebaseAuth) {
        _auth.subscribe((state: FirebaseAuthState) => {
                this.authState = state;
            },
            error => { //-- on error
                this.handleError(<any>error);
            },
            () => { //-- on completion
                console.log('authState:[UserInfo] ' + JSON.stringify(this.authState.auth))
            });
    }

    signIn(provider: number): firebase.Promise<FirebaseAuthState> {
        return this._auth.login({ provider });
    }

    login(credentials): firebase.Promise<FirebaseAuthState> {
        return this._auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        });
    }

    createUser(credentials): firebase.Promise<FirebaseAuthState> {
        return this._auth.createUser(credentials)
            .then((authData: FirebaseAuthState) => {
                return this.login(credentials);
            });
    }

    signInWithGithub(): firebase.Promise<FirebaseAuthState> {
        return this.signIn(AuthProviders.Github);
    }

    signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
        return this.signIn(AuthProviders.Google);
    }

    signInWithTwitter(): firebase.Promise<FirebaseAuthState> {
        return this.signIn(AuthProviders.Twitter);
    }

    signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
        return this.signIn(AuthProviders.Facebook);
    }

    signInWithAnonymous(): firebase.Promise<FirebaseAuthState> {
        return this._auth.login({
            provider: AuthProviders.Anonymous,
            method: AuthMethods.Anonymous,
        });
    }

    signOut(): void {
        this._auth.logout();
    }

    authGuard(): Observable<boolean> {
        return this._auth
            .take(1)
            .map(authState => !!authState)
            .do(authenticated => {
                console.log('authGuard: ' + JSON.stringify(authenticated))
            });
    }

    unauthGuard(): Observable<boolean> {
        return this._auth
            .take(1)
            .map(authState => !authState)
            .do(unauthenticated => {
                console.log('unauthGuard: ' + JSON.stringify(unauthenticated))
            });
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    get id(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    get userInfo(): Usuario {
        if (this.authenticated && this.authState !== null) {
            if (this.authState.auth.isAnonymous) {
                return {
                    data: null,
                    displayName: this.authState.auth.displayName || 'Nome de usuário',
                    email: this.authState.auth.email || 'usuario@usuario.com.br',
                    password: '',
                    photoURL: this.authState.auth.photoURL || 'img/user-woman.svg',
                    providerId: this.authState.auth.providerId,
                    uid: this.authState.uid || this.authState.auth.uid,
                    endereco: new Endereco()
                }
            } else {
                return {
                    data: null,
                    displayName: this.authState.auth.displayName || this.authState.auth.providerData[0].displayName || 'Nome de usuário',
                    email: this.authState.auth.email || this.authState.auth.providerData[0].email || 'usuario@usuario.com.br',
                    password: '',
                    photoURL: this.authState.auth.photoURL || this.authState.auth.providerData[0].photoURL || 'img/user-woman.svg',
                    providerId: this.authState.auth.providerId,
                    uid: this.authState.uid || this.authState.auth.uid || this.authState.auth.providerData[0].uid,
                    endereco: new Endereco()
                }
            }
        }
        else {
            return {
                data: null,
                displayName: 'Nome de usuário',
                email: 'usuario@usuario.com.br',
                password: '',
                photoURL: 'img/user-woman.svg',
                providerId: '',
                uid: '',
                endereco: new Endereco()
            }
        }
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Houve falha na execução desta operação. Por favor, tente novamente mais tarde.';
        console.error('handleError: ' + errMsg);
        return Observable.throw(errMsg);
    }
}