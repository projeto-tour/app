import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { ICaracteristicaTipoPontoInteresse, CaracteristicaTipoPontoInteresse } from '../';
import { FIREBASE_CONFIG, FirebaseConfig } from '../const/config.const';

import { ExceptionService } from '../providers/exception.service';
import { ProgressBarService } from '../directives/progress-bar/progress-bar.service';

@Injectable()
export class CaracteristicaTipoPontoInteresseService {

    list: FirebaseListObservable<any>;
    path: string;

    constructor(
        private _angularFire: AngularFire,
        private _exceptionService: ExceptionService,
        private _progressBarService: ProgressBarService,
        @Inject(FIREBASE_CONFIG) _firebaseConfig: FirebaseConfig) {
        this.list = _angularFire.database.list(_firebaseConfig.caracteristica_tipo_ponto_interesse);
    }

    create(caracteristicaTipoPontoInteresse: CaracteristicaTipoPontoInteresse): any {
        return this.list.push(caracteristicaTipoPontoInteresse).key;
    }

    update(caracteristicaTipoPontoInteresse: ICaracteristicaTipoPontoInteresse, changes: any): firebase.Promise<any> {
        this._progressBarService.show();
        return this.list.update(caracteristicaTipoPontoInteresse.$key, changes)
            .then((data) => {
                return this.requestResponse(true, null);
            })
            .catch((error) => {
                return this.requestResponse(false, error);
            });
    }

    updates(item: any, changes: any): firebase.Promise<any> {
        this._progressBarService.show();
        return this.list.update(item, changes)
            .then((data) => {
                return this.requestResponse(true, null);
            })
            .catch((error) => {
                return this.requestResponse(false, error);
            });
    }

    remove(caracteristicaTipoPontoInteresse: ICaracteristicaTipoPontoInteresse): firebase.Promise<any> {
        this._progressBarService.show();
        return this.list.remove(caracteristicaTipoPontoInteresse.$key)
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
