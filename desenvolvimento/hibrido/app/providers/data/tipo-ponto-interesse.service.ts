import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

import { FirebaseAuthService } from '../auth';
import {
  FIREBASE_CONFIG,
  FirebaseConfig,
  TIPO_PONTO_INTERESSE_URL,
  ITipoPontoInteresse
} from '../../pages/shared';

@Injectable()
export class TipoPontoInteresseService {

  tipos: FirebaseListObservable<ITipoPontoInteresse[]>;

  constructor(
    public _af: AngularFire,
    public _auth: FirebaseAuthService,
    public _http: Http,
    @Inject(FIREBASE_CONFIG) public _firebaseConfig: FirebaseConfig) {
    this.tipos = _af.database.list(`${_firebaseConfig.tipo_ponto_interesse}`);
  }

  create(tipoPontoInteresse: ITipoPontoInteresse): firebase.Promise<any> {
    return this.tipos.push(tipoPontoInteresse);
  }

  remove(tipoPontoInteresse: ITipoPontoInteresse): firebase.Promise<any> {
    return this.tipos.remove(tipoPontoInteresse.$key);
  }

  update(tipoPontoInteresse: ITipoPontoInteresse, changes: any): firebase.Promise<any> {
    return this.tipos.update(tipoPontoInteresse.$key, changes);
  }

  setPontoInteresse(key: string, changes: any): firebase.Promise<any> {
    return this._af.database.object(`${this._firebaseConfig.tipo_ponto_interesse}/${key}/${this._firebaseConfig.ponto_interesse}/${this._auth.uid || this._auth.userInfo.uid}`).update(changes);
  }

  getMock(): Observable<ITipoPontoInteresse[]> {
    let data = this._http.get(TIPO_PONTO_INTERESSE_URL);
    return data.map((response: Response) => <ITipoPontoInteresse[]>response.json());
  }

}
