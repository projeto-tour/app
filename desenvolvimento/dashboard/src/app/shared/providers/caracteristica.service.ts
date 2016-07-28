import { Injectable, bind, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { ICaracteristica, Caracteristica } from '../';
import { FIREBASE_CONFIG, FirebaseConfig } from '../config';

import { ExceptionService } from '../providers/exception.service';
import { ProgressBarService } from '../providers/progress-bar.service';

@Injectable()
export class CaracteristicaService {

  list: FirebaseListObservable<any>;

  constructor(
    private _angularFire: AngularFire,
    private _exceptionService: ExceptionService,
    private _progressBarService: ProgressBarService,
    @Inject(FIREBASE_CONFIG) _firebaseConfig: FirebaseConfig) {
    this.list = _angularFire.database.list(_firebaseConfig.caracteristica);
  }

  create(caracteristica: Caracteristica): firebase.Promise<any> {
    console.log('create>> caracteristica: ' + JSON.stringify(caracteristica));
    this._progressBarService.show();
    return this.list.push(caracteristica)
      .then((data) => {
        this._progressBarService.hide();
      })
      .catch((error) => {
        this._progressBarService.hide();
        this._exceptionService.catchBadResponse(error)
      });
  }

  update(caracteristica: ICaracteristica, changes: any): firebase.Promise<any> {
    console.log('update>> caracteristica: ' + JSON.stringify(caracteristica) + '  changes: ' + JSON.stringify(changes));
    this._progressBarService.show();
    return this.list.update(caracteristica.$key, changes)
      .then((data) => {
        this._progressBarService.hide();
      })
      .catch((error) => {
        this._progressBarService.hide();
        this._exceptionService.catchBadResponse(error)
      });
  }

  remove(caracteristica: ICaracteristica): firebase.Promise<any> {
    console.log('remove>> caracteristica: ' + JSON.stringify(caracteristica));
    this._progressBarService.show();
    return this.list.remove(caracteristica.$key)
      .then((data) => {
        this._progressBarService.hide();
      })
      .catch((error) => {
        this._progressBarService.hide();
        this._exceptionService.catchBadResponse(error)
      });
  }

}

export var caracteristicaServiceInjectables: Array<any> = [
  bind(CaracteristicaService).toClass(CaracteristicaService)
];