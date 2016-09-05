import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { ICaracteristica, Caracteristica } from '../';
import { FIREBASE_CONFIG, FirebaseConfig } from '../const/config.const';

import { ExceptionService } from '../providers/exception.service';
import { ProgressBarService } from '../directives/progress-bar/progress-bar.service';

@Injectable()
export class CaracteristicaService {

  list: FirebaseListObservable<any>;

  constructor(
    private _angularFire: AngularFire,
    private _exceptionService: ExceptionService,
    private _progressBarService: ProgressBarService,
    @Inject(FIREBASE_CONFIG) _firebaseConfig: FirebaseConfig) {
    this.list = _angularFire.database.list(_firebaseConfig.caracteristica);
    this.list = _angularFire.database.list('caracteristica');
    // this.list.subscribe(data => { console.log('CaracteristicaService: ' + JSON.stringify(data)); });
  }

  create(caracteristica: Caracteristica): any {
    console.log('create>> caracteristica: ' + JSON.stringify(caracteristica));
    return this.list.push(caracteristica).key;
  }

  update(caracteristica: ICaracteristica, changes: any): firebase.Promise<any> {
    console.log('update>> caracteristica: ' + JSON.stringify(caracteristica) + '  changes: ' + JSON.stringify(changes));
    this._progressBarService.show();
    return this.list.update(caracteristica.$key, changes)
      .then((data) => {
        return this.requestResponse(true, null);
      })
      .catch((error) => {
        return this.requestResponse(false, error);
      });
  }

  updates(item: any, changes: any): firebase.Promise<any> {
    console.log('updates>> item: ' + JSON.stringify(item) + '  changes: ' + JSON.stringify(changes));
    this._progressBarService.show();
    return this.list.update(item, changes)
      .then((data) => {
        return this.requestResponse(true, null);
      })
      .catch((error) => {
        return this.requestResponse(false, error);
      });
  }

  remove(caracteristica: ICaracteristica): firebase.Promise<any> {
    console.log('remove>> caracteristica: ' + JSON.stringify(caracteristica));
    this._progressBarService.show();
    return this.list.remove(caracteristica.$key)
      .then((data) => {
        return this.requestResponse(true, null);
      })
      .catch((error) => {
        return this.requestResponse(false, error);
      });
  }

  private requestResponse(ok: boolean, error: any): void {
    this._progressBarService.hide();
    if (!ok) {
      this._exceptionService.catchBadResponse(error);
    }
  }

}
