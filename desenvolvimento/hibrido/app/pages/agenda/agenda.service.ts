import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AgendaView } from './';

import { AGENDA_URL, TIPO_AGENDA_URL, TipoAgenda } from '../shared';

@Injectable()
export class AgendaService {

    agendas: Observable<AgendaView[]> = null;

    constructor(private _http: Http) { }

    getAgendas(): Observable<AgendaView[]> {
        if (this.agendas === null) {
            let data = this._http.get(AGENDA_URL);
            this.agendas = data.map((response: Response) => <AgendaView[]>response.json())
                // .do(data => console.log('getAgendas: ' +  JSON.stringify(data)))
                .catch(this.handleError)
        }
        return this.agendas;
    }

    getAgendasARealizar(): Observable<AgendaView[]> {
        return this.getAgendas()
            .map((lista: AgendaView[]) => lista.filter((data: AgendaView) => new Date(data.dataInicio) >= new Date()))
            .catch(this.handleError);
    }

    getAgendasRealidas(): Observable<AgendaView[]> {
        return this.getAgendas()
            .map((lista: AgendaView[]) => lista.filter((data: AgendaView) => new Date(data.dataFim) < new Date()))
            .catch(this.handleError);
    }

    getAgenda(id: number): Observable<AgendaView> {
        return this.getAgendas()
            .map((lista: AgendaView[]) => lista.find(obj => obj.id === id))
            .catch(this.handleError);
    }

    getTiposDeAgenda(): Observable<TipoAgenda[]> {
        let data = this._http.get(TIPO_AGENDA_URL);
        return data.map((response: Response) => <TipoAgenda[]>response.json())
            // .do(data => console.log('getTiposDeAgenda: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getTipoAgenda(id: number): Observable<TipoAgenda> {
        return this.getTiposDeAgenda()
            .map((lista: TipoAgenda[]) => lista.find(obj => obj.id === id))
            .catch(this.handleError);;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Houve falha na execução desta operação. Por favor, tente novamente mais tarde.');
    }
}