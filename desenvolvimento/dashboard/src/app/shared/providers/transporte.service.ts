import { Injectable, bind, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { ITransporte, Transporte } from '../';
import { FIREBASE_CONFIG, FirebaseConfig } from '../config';

import { ExceptionService } from '../providers/exception.service';
import { ProgressBarService } from '../providers/progress-bar.service';

@Injectable()
export class TransporteService {

  list: FirebaseListObservable<any>;

  constructor(
    private _angularFire: AngularFire,
    private _exceptionService: ExceptionService,
    private _progressBarService: ProgressBarService,
    @Inject(FIREBASE_CONFIG) _firebaseConfig: FirebaseConfig) {
    this.list = _angularFire.database.list(_firebaseConfig.transporte);
    this.list.subscribe(data => { console.log('TransporteService: '+JSON.stringify(data)); });
  }

  create(transporte: Transporte): any {
    console.log('create>> transporte: ' + JSON.stringify(transporte));
    return this.list.push(transporte).key;
  }

  update(transporte: ITransporte, changes: any): firebase.Promise<any> {
    console.log('update>> transporte: ' + JSON.stringify(transporte) + '  changes: ' + JSON.stringify(changes));
    this._progressBarService.show();
    return this.list.update(transporte.$key, changes)
      .then((data) => {
        return this.requestResponse(true, null);
      })
      .catch((error) => {
        return this.requestResponse(false, error);
      });
  }

  remove(transporte: ITransporte): firebase.Promise<any> {
    console.log('remove>> transporte: ' + JSON.stringify(transporte));
    this._progressBarService.show();
    return this.list.remove(transporte.$key)
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
        this._exceptionService.catchBadResponse(error)
    }
  }
  
}

export var transporteServiceInjectables: Array<any> = [
  bind(TransporteService).toClass(TransporteService)
];