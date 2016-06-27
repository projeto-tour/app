import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Mapa } from './';

import { MAPA_URL } from '../shared';

@Injectable()
export class MapaService {

    constructor(private _http: Http) { }

    getMapas(): Observable<Mapa[]> {
        let data = this._http.get(MAPA_URL);
        return data.map((response: Response) => <Mapa[]>response.json())
            //.do(data => console.log('getMapas: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Houve falha na execução desta operação. Por favor, tente novamente mais tarde.');
    }
}