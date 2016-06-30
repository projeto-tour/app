import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { FirebaseAuthService } from '../auth';

import { Usuario, IUsuario } from './usuario.model';

@Injectable()
export class UsuarioService {
    visibleUsuarios$: Observable<IUsuario[]>;

    private filter$: ReplaySubject<any> = new ReplaySubject(1);
    private filteredUsuarios$: FirebaseListObservable<IUsuario[]>;
    private usuarios$: FirebaseListObservable<IUsuario[]>;

    constructor(
        af: AngularFire,
        auth: FirebaseAuthService) {
        const path = `/usuarios/${auth.id}`;

        this.usuarios$ = af.database.list(path);

        this.filteredUsuarios$ = af.database.list(path, {
            query: {
                orderByChild: 'nome',
                equalTo: this.filter$
            }
        });

        this.visibleUsuarios$ = Observable.merge(this.filter$)
            .switchMap(filter => filter === null ? this.usuarios$ : this.filteredUsuarios$);
    }

    filterUsuarios(filter: string): void {
        switch (filter) {
            case 'false':
                this.filter$.next(false);
                break;

            case 'true':
                this.filter$.next(true);
                break;

            default:
                this.filter$.next(null);
                break;
        }
    }

    createUsuario(title: string): firebase.Promise<any> {
        return this.usuarios$.push(new Usuario(title)).catch(this.handleError);
    }

    removeUsuario(usuario: IUsuario): firebase.Promise<any> {
        return this.usuarios$.remove(usuario.$key).catch(this.handleError);
    }

    updateUsuario(usuario: IUsuario, changes: any): firebase.Promise<any> {
        return this.usuarios$.update(usuario.$key, changes).catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Houve falha na execução desta operação. Por favor, tente novamente mais tarde.';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
