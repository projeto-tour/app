import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { FirebaseAuthService } from '../auth';
import {
    FIREBASE_CONFIG,
    FirebaseConfig,
    AGENDA_URL,
    HISTORICO_URL,
    IAgenda,
    IHistorico
} from '../../pages/shared';

@Injectable()
export class AgendaService {

    agendas: Observable<IAgenda[]>;
    historicos: Observable<IAgenda[]>;
    agendasPorTipo: Observable<IAgenda[]>;

    private filterAgenda: ReplaySubject<any> = new ReplaySubject(1);
    private filteredAgendas: FirebaseListObservable<IAgenda[]>;

    private filterHistorico: ReplaySubject<any> = new ReplaySubject(1);
    private filteredHistoricos: FirebaseListObservable<IAgenda[]>;

    private filterByTipoAgenda: ReplaySubject<any> = new ReplaySubject(1);
    private filteredByTipoAgenda: FirebaseListObservable<IAgenda[]>;

    private items: FirebaseListObservable<IAgenda[]>;

    constructor(
        public _af: AngularFire,
        public _auth: FirebaseAuthService,
        public _http: Http,
        @Inject(FIREBASE_CONFIG) public _firebaseConfig: FirebaseConfig) {
        const path = `${_firebaseConfig.agenda}/${_auth.uid || _auth.userInfo.uid}`;

        this.items = _af.database.list(path);

        this.filteredAgendas = _af.database.list(path, {
            query: {
                orderByChild: 'data_fim',
                startAt: this.filterAgenda,
            }
        });

        this.filteredHistoricos = _af.database.list(path, {
            query: {
                orderByChild: 'data_fim',
                endAt: this.filterHistorico,
            }
        });

        this.filteredByTipoAgenda = _af.database.list(path, {
            query: {
                orderByChild: 'tipo_agenda',
                equalTo: this.filterByTipoAgenda,
            }
        });

        this.agendas = Observable.merge(this.filterAgenda)
            .switchMap(filter => filter === null ? this.items : this.filteredAgendas);

        this.historicos = Observable.merge(this.filterHistorico)
            .switchMap(filter => filter === null ? this.items : this.filteredHistoricos);

        this.agendasPorTipo = Observable.merge(this.filterByTipoAgenda)
            .switchMap(filter => filter === null ? this.items : this.filteredByTipoAgenda);
    }

    filterByDate(filter: string, isHistorico: boolean): void {
        if (isHistorico) {
            this.filterHistorico.next(filter);
        } else {
            this.filterAgenda.next(filter);
        }
    }

    filterByTipo(filter: string): void {
        this.filterByTipoAgenda.next(filter);
    }

    create(agenda: IAgenda): any {
        // console.log('create: ' + JSON.stringify(agenda));
        return this.items.push(agenda).key;
    }

    remove(agenda: IAgenda): firebase.Promise<any> {
        return this.items.remove(agenda.$key);
    }

    update(agenda: IAgenda, changes: any): firebase.Promise<any> {
        // console.log('update:[agenda] ' + JSON.stringify(agenda) + ' changes: ' + JSON.stringify(changes));
        return this.items.update(agenda.$key, changes);
    }

    setRota(key: string, changes: any): firebase.Promise<any> {
        return this._af.database.object(`${this._firebaseConfig.agenda}/${key}/${this._firebaseConfig.rota}`).update(changes);
    }

    getMockAgendas(): Observable<IAgenda[]> {
        let data = this._http.get(AGENDA_URL);
        return data.map((response: Response) => <IAgenda[]>response.json());
    }

    getMockHistoricos(): Observable<IHistorico[]> {
        let data = this._http.get(HISTORICO_URL);
        return data.map((response: Response) => <IHistorico[]>response.json());
    }

}
