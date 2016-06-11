import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Historico } from './';

import { HISTORICO_URL } from '../shared';

@Injectable()
export class HistoricoService {

    constructor(private _http: Http) { }

    getHistoricos(): Observable<Historico[]> {
        let data = this._http.get(HISTORICO_URL);
        return data.map((response: Response) => <Historico[]>response.json())
            // .do(data => console.log('getHistoricos: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getHistorico(id: number): Observable<Historico> {
        return this.getHistoricos()
            .map((data: Historico[]) => data.find(obj => obj.id === id))
            .catch(this.handleError);;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Houve falha na execução desta operação. Por favor, tente novamente mais tarde.');
    }
}