import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { FirebaseAuthService } from '../auth';
import {
    FIREBASE_CONFIG,
    // IFirebaseConfig,
    ROTA_URL,
    IRota
} from '../../pages/shared';

@Injectable()
export class RotaService {

    list: Observable<IRota[]>;

    private filter: ReplaySubject<any> = new ReplaySubject(1);
    private filteredItems: FirebaseListObservable<IRota[]>;
    private items: FirebaseListObservable<IRota[]>;

    constructor(
        public _af: AngularFire,
        public _auth: FirebaseAuthService,
        public _http: Http,
        @Inject(FIREBASE_CONFIG) public _firebaseConfig: any) {
        const path = `${_firebaseConfig.rota}/${this._auth.uid || this._auth.userInfo.uid}`;

        this.items = _af.database.list(path);

        this.filteredItems = _af.database.list(path, {
            query: { orderByChild: 'agenda', equalTo: this.filter }
        });

        this.list = this.filter.switchMap(filter => filter === null ? this.items : this.filteredItems);
    }

    filterRotas(agenda: string): void {
        // console.log('filterRotas[Agenda]: ' + agenda);
        this.filter.next(agenda);
    }

    create(rota: IRota): any {
        // console.log('create[Rota]: ' + JSON.stringify(rota));
        return this.items.push(rota).key;
    }

    remove(rota: string): firebase.Promise<any> {
        // console.log('remove:[Rota] ' + JSON.stringify(rota) );
        return this.items.remove(rota);
    }

    update(rota: string, changes: any): firebase.Promise<any> {
        // console.log('update:[Rota] ' + JSON.stringify(rota) + ' changes: ' + JSON.stringify(changes));
        return this.items.update(rota, changes);
    }

    getMock(): Observable<IRota[]> {
        let data = this._http.get(ROTA_URL);
        return data.map((response: Response) => <IRota[]>response.json());
    }

}
