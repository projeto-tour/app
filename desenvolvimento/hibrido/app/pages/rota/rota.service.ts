import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Rota, ROTA_URL } from '../shared';

@Injectable()
export class RotaService {

    constructor(private _http: Http) { }

    getRotas(id: Number): Observable<Rota[]> {
        let data = this._http.get(ROTA_URL);
        return data.map((response: Response) => <Rota[]>response.json())
            // .do(data => console.log('getRotas: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getRota(id: number, idAgenda: number): Observable<Rota> {
        return this.getRotas(idAgenda)
            .map((lista: Rota[]) => lista.find(obj => obj.id === id))
            // .do(data => console.log('getRota: ' +  JSON.stringify(data)))
            .catch(this.handleError);;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Houve falha na execução desta operação. Por favor, tente novamente mais tarde.');
    }
}