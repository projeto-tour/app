import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

import { FirebaseAuthService } from '../auth';
import {
  FIREBASE_CONFIG,
  FirebaseConfig,
  TIPO_AGENDA_URL,
  ITipoAgenda
} from '../../pages/shared';

@Injectable()
export class TipoAgendaService {

  list: FirebaseListObservable<ITipoAgenda[]>;

  constructor(
    public _af: AngularFire,
    public _auth: FirebaseAuthService,
    public _http: Http,
    @Inject(FIREBASE_CONFIG) public _firebaseConfig: FirebaseConfig) {
    this.list = _af.database.list(`${_firebaseConfig.tipo_agenda}`);
  }

  create(tipoAgenda: ITipoAgenda): firebase.Promise<any> {
    return this.list.push(tipoAgenda);
  }

  remove(tipoAgenda: ITipoAgenda): firebase.Promise<any> {
    return this.list.remove(tipoAgenda.$key);
  }

  update(tipoAgenda: ITipoAgenda, changes: any): firebase.Promise<any> {
    return this.list.update(tipoAgenda.$key, changes);
  }

  setAgenda(key: string, changes: any): firebase.Promise<any> {
    return this._af.database.object(`${this._firebaseConfig.tipo_agenda}/${key}/${this._firebaseConfig.agenda}/${this._auth.uid || this._auth.userInfo.uid}`).update(changes);
  }

  getMock(): Observable<ITipoAgenda[]> {
    let data = this._http.get(TIPO_AGENDA_URL);
    return data.map((response: Response) => <ITipoAgenda[]>response.json());
  }

}
