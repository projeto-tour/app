import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { IAvaliacao, Avaliacao } from '../';
import { FIREBASE_CONFIG, FirebaseConfig } from '../const/config.const';

import { ExceptionService } from '../providers/exception.service';
import { ProgressBarService } from '../directives/progress-bar/progress-bar.service';

@Injectable()
export class AvaliacaoService {

    list: FirebaseListObservable<any>;
    path: string;

    constructor(
        private _angularFire: AngularFire,
        private _exceptionService: ExceptionService,
        private _progressBarService: ProgressBarService,
        @Inject(FIREBASE_CONFIG) _firebaseConfig: FirebaseConfig) {
        this.list = _angularFire.database.list(_firebaseConfig.avaliacao);
        // this.list.subscribe(data => { console.log('AvaliacaoService: ' + JSON.stringify(data)); });
    }

    create(avaliacao: Avaliacao): any {
        // console.log('create>> avaliacao: ' + JSON.stringify(avaliacao));
        return this.list.push(avaliacao).key;
    }

    update(avaliacao: IAvaliacao, changes: any): firebase.Promise<any> {
        // console.log('update>> avaliacao: ' + JSON.stringify(avaliacao) + '  changes: ' + JSON.stringify(changes));
        this._progressBarService.show();
        return this.list.update(avaliacao.$key, changes)
            .then((data) => {
                return this.requestResponse(true, null);
            })
            .catch((error) => {
                return this.requestResponse(false, error);
            });
    }

    updates(item: any, changes: any): firebase.Promise<any> {
        // console.log('updates>> item: ' + JSON.stringify(item) + '  changes: ' + JSON.stringify(changes));
        this._progressBarService.show();
        return this.list.update(item, changes)
            .then((data) => {
                return this.requestResponse(true, null);
            })
            .catch((error) => {
                return this.requestResponse(false, error);
            });
    }

    remove(avaliacao: IAvaliacao): firebase.Promise<any> {
        // console.log('remove>> avaliacao: ' + JSON.stringify(avaliacao));
        this._progressBarService.show();
        return this.list.remove(avaliacao.$key)
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
