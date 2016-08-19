import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Preferencia } from './';

import { PREFERENCIA_URL } from '../shared';

@Injectable()
export class PreferenciaService {

    constructor(
        public _http: Http) { }

    getPreferencias(): Observable<Preferencia[]> {
        let data = this._http.get(PREFERENCIA_URL);
        return data.map((response: Response) => <Preferencia[]>response.json())
            // .do(data => console.log('getPreferencias: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPreferencia(id: number): Observable<Preferencia> {
        return this.getPreferencias()
            .map((lista: Preferencia[]) => lista.find(obj => obj.id === id))
            // .do(data => console.log('getPreferencia: ' +  JSON.stringify(data)))
            .catch(this.handleError);;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Houve um erro ao conectar com o servidor.');
    }
}