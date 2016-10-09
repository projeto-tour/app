import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

import { FirebaseAuthService } from '../auth';
import {
    FIREBASE_CONFIG,
    // IFirebaseConfig,
    USUARIO_URL,
    IUsuario
} from '../../pages/shared';

@Injectable()
export class UsuarioService {

    user: FirebaseObjectObservable<any>;

    constructor(
        public _af: AngularFire,
        public _auth: FirebaseAuthService,
        public _http: Http,
        @Inject(FIREBASE_CONFIG) public _firebaseConfig: any) {
        this.user = _af.database.object(`${_firebaseConfig.usuario}/${_auth.uid || _auth.userInfo.uid}`);
    }

    get usuario(): FirebaseObjectObservable<any> {
        return this.user;
    }

    create(usuario: IUsuario): firebase.Promise<any> {
        return this.usuario.set(usuario);
    }

    remove(): firebase.Promise<any> {
        return this.usuario.remove();
    }

    getMock(): Observable<IUsuario> {
        let data = this._http.get(USUARIO_URL);
        return data.map((response: Response) => <IUsuario>response.json());
    }

}
