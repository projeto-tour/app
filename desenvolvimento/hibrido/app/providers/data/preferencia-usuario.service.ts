import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

import { FirebaseAuthService } from '../auth';
import {
  FIREBASE_CONFIG,
  FirebaseConfig,
  PREFERENCIA_USUARIO_URL,
  IPreferenciaUsuario
} from '../../pages/shared';

@Injectable()
export class PreferenciaUsuarioService {

  tipos: FirebaseListObservable<IPreferenciaUsuario[]>;

  constructor(
    public _af: AngularFire,
    public _auth: FirebaseAuthService,
    public _http: Http,
    @Inject(FIREBASE_CONFIG) public _firebaseConfig: FirebaseConfig) {
    this.tipos = _af.database.list(`${_firebaseConfig.ponto_interesse}/${this._auth.uid || this._auth.userInfo.uid}`);
  }

  create(preferenciaUsuario: IPreferenciaUsuario): any {
    console.log('create: ' + JSON.stringify(preferenciaUsuario));
    return this.tipos.push(preferenciaUsuario).key;
  }

  remove(preferenciaUsuario: IPreferenciaUsuario): firebase.Promise<any> {
    return this.tipos.remove(preferenciaUsuario.$key);
  }

  update(preferenciaUsuario: IPreferenciaUsuario, changes: any): firebase.Promise<any> {
    console.log('update:[preferenciaUsuario] ' + JSON.stringify(preferenciaUsuario) + ' changes: ' + JSON.stringify(changes));
    return this.tipos.update(preferenciaUsuario.$key, changes);
  }

  getMock(): Observable<IPreferenciaUsuario[]> {
    let data = this._http.get(PREFERENCIA_USUARIO_URL);
    return data.map((response: Response) => <IPreferenciaUsuario[]>response.json());
  }

}
