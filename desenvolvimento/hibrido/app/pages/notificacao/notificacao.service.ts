import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Notificacao } from './';

import { NOTIFICACAO_URL} from '../shared';

@Injectable()
export class NotificacaoService {

    constructor(
        public _http: Http) { }

    getNotificacoes(): Observable<Notificacao[]> {
        let data = this._http.get(NOTIFICACAO_URL);
        return data.map((response: Response) => <Notificacao[]>response.json())
            // .do(data => console.log('getNotificacoes: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getNotificacao(id: number): Observable<Notificacao> {
        return this.getNotificacoes()
            .map((lista: Notificacao[]) => lista.find(obj => obj.id === id))
            // .do(data => console.log('getNotificacao: ' +  JSON.stringify(data)))
            .catch(this.handleError);;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Houve falha na execução desta operação. Por favor, tente novamente mais tarde.');
    }
}