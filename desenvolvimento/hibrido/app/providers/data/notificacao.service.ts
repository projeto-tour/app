import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

import { FirebaseAuthService } from '../auth';
import {
  FIREBASE_CONFIG,
  FirebaseConfig,
  NOTIFICACAO_URL,
  INotificacao
} from '../../pages/shared';

@Injectable()
export class NotificacaoService {

  list: FirebaseListObservable<INotificacao[]>;

  constructor(
    public _af: AngularFire,
    public _auth: FirebaseAuthService,
    public _http: Http,
    @Inject(FIREBASE_CONFIG) _firebaseConfig: FirebaseConfig) {
    this.list = _af.database.list(`${_firebaseConfig.tipo_agenda}/${_auth.uid || _auth.userInfo.uid}`);
  }

  create(notificacao: INotificacao): firebase.Promise<any> {
    return this.list.push(notificacao);
  }

  remove(notificacao: INotificacao): firebase.Promise<any> {
    return this.list.remove(notificacao.$key);
  }

  update(notificacao: INotificacao, changes: any): firebase.Promise<any> {
    return this.list.update(notificacao.$key, changes);
  }

  getMock(): Observable<INotificacao[]> {
    let data = this._http.get(NOTIFICACAO_URL);
    return data.map((response: Response) => <INotificacao[]>response.json());
  }

}
