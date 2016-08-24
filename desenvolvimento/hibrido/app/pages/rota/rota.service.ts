import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Rota, ROTA_URL } from '../shared';

@Injectable()
export class RotaService {

    constructor(
        public _http: Http) { }

    getRotas(): Observable<Rota[]> {
        let data = this._http.get(ROTA_URL);
        return data.map((response: Response) => <Rota[]>response.json())
            // .do(data => console.log('getRotas: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getRota(id: number, idAgenda: number): Observable<Rota> {
        return this.getRotas()
            .map((lista: Rota[]) => lista)
            // .do(data => console.log('getRota: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Houve falha na execução desta operação. Por favor, tente novamente mais tarde.';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}