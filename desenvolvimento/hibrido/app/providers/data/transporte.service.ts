import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

import { FirebaseAuthService } from '../auth';
import {
  FIREBASE_CONFIG,
  FirebaseConfig,
  TRANSPORTE_URL,
  ITransporte
} from '../../pages/shared';

@Injectable()
export class TransporteService {

  list: FirebaseListObservable<ITransporte[]>;

  constructor(
    public _af: AngularFire,
    public _auth: FirebaseAuthService,
    public _http: Http,
    @Inject(FIREBASE_CONFIG) public _firebaseConfig: FirebaseConfig) {
    this.list = _af.database.list(`${_firebaseConfig.transporte}`);
  }

  create(transporte: ITransporte): firebase.Promise<any> {
    return this.list.push(transporte);
  }

  remove(transporte: ITransporte): firebase.Promise<any> {
    return this.list.remove(transporte.$key);
  }

  update(transporte: ITransporte, changes: any): firebase.Promise<any> {
    return this.list.update(transporte.$key, changes);
  }

  setRota(key: string, changes: any): firebase.Promise<any> {
    return this._af.database.object(`${this._firebaseConfig.transporte}/${key}/${this._firebaseConfig.rota}/${this._auth.uid || this._auth.userInfo.uid}`).update(changes);
  }

  getMock(): Observable<ITransporte[]> {
    let data = this._http.get(TRANSPORTE_URL);
    return data.map((response: Response) => <ITransporte[]>response.json());
  }

}
