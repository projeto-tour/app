import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { FirebaseAuthService } from '../auth';
import { IAgenda } from './agenda.model';
import { AGENDA_URL, TIPO_AGENDA_URL } from '../../pages/shared';

@Injectable()
export class AgendaService {

    agendas: Observable<IAgenda[]>;
    historicos: Observable<IAgenda[]>;

    private filterAgenda: ReplaySubject<any> = new ReplaySubject(1);
    private filteredAgendas: FirebaseListObservable<IAgenda[]>;

    private filterHistorico: ReplaySubject<any> = new ReplaySubject(1);
    private filteredHistoricos: FirebaseListObservable<IAgenda[]>;

    private items: FirebaseListObservable<IAgenda[]>;

    constructor(af: AngularFire, auth: FirebaseAuthService, private http: Http) {
        const path = `/agendas/${auth.id}`;

        this.items = af.database.list(path);

        this.filteredAgendas = af.database.list(path, {
            query: {
                orderByChild: 'dataFim',
                startAt: this.filterAgenda,
            }
        });

        this.filteredHistoricos = af.database.list(path, {
            query: {
                orderByChild: 'dataFim',
                endAt: this.filterHistorico,
            }
        });

        this.agendas = Observable.merge(this.filterAgenda)
            .switchMap(filter => filter === null ? this.items : this.filteredAgendas);

        this.historicos = Observable.merge(this.filterHistorico)
            .switchMap(filter => filter === null ? this.items : this.filteredHistoricos);
    }
    
    filterAgendas(filter: string): void {
        this.filterAgenda.next(filter);
    }

    filterHistoricos(filter: string): void {
        this.filterHistorico.next(filter);
    }

    createAgenda(agenda: IAgenda): firebase.Promise<any> {
        return this.items.push(agenda);
    }

    removeAgenda(agenda: IAgenda): firebase.Promise<any> {
        return this.items.remove(agenda.$key);
    }

    updateAgenda(agenda: IAgenda, changes: any): firebase.Promise<any> {
        return this.items.update(agenda.$key, changes);
    }

    getMockAgendas(): Observable<IAgenda[]> {
        let data = this.http.get(AGENDA_URL);
        return data.map((response: Response) => <IAgenda[]>response.json());
    }
}