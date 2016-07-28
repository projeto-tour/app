import { Injectable, bind, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { ITipo, Tipo } from '../';
import { FIREBASE_CONFIG, FirebaseConfig } from '../config';

import { ExceptionService } from '../providers/exception.service';
import { ProgressBarService } from '../providers/progress-bar.service';

@Injectable()
export class TipoPontoInteresseService {

  list: FirebaseListObservable<any>;

  constructor(
    private _angularFire: AngularFire,
    private _exceptionService: ExceptionService,
    private _progressBarService: ProgressBarService,
    @Inject(FIREBASE_CONFIG) _firebaseConfig: FirebaseConfig) {
    this.list = _angularFire.database.list(_firebaseConfig.tipo_ponto_interesse);
  }

  create(tipo: Tipo): firebase.Promise<any> {
    console.log('create>> tipo: ' + JSON.stringify(tipo));
    this._progressBarService.show();
    return this.list.push(tipo)
      .then((data) => {
        this._progressBarService.hide();
      })
      .catch((error) => {
        this._progressBarService.hide();
        this._exceptionService.catchBadResponse(error)
      });
  }

  update(tipo: ITipo, changes: any): firebase.Promise<any> {
    console.log('update>> tipo: ' + JSON.stringify(tipo) + '  changes: ' + JSON.stringify(changes));
    this._progressBarService.show();
    return this.list.update(tipo.$key, changes)
      .then((data) => {
        this._progressBarService.hide();
      })
      .catch((error) => {
        this._progressBarService.hide();
        this._exceptionService.catchBadResponse(error)
      });
  }

  remove(tipo: ITipo): firebase.Promise<any> {
    console.log('remove>> tipo: ' + JSON.stringify(tipo));
    this._progressBarService.show();
    return this.list.remove(tipo.$key)
      .then((data) => {
        this._progressBarService.hide();
      })
      .catch((error) => {
        this._progressBarService.hide();
        this._exceptionService.catchBadResponse(error)
      });
  }

}

export var tipoPontoInteresseServiceInjectables: Array<any> = [
  bind(TipoPontoInteresseService).toClass(TipoPontoInteresseService)
];