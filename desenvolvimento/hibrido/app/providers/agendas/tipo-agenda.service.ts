import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { ITipoAgenda } from './tipo-agenda.model';
import { TIPO_AGENDA_URL } from '../../pages/shared';

@Injectable()
export class TipoAgendaService {
  tipos: FirebaseListObservable<ITipoAgenda[]>;

  constructor(
    private _af: AngularFire,
    private _http: Http) {
    this.tipos = _af.database.list('/tipos_agenda');
  }

  createTipoAgenda(tipoAgenda: ITipoAgenda): firebase.Promise<any> {
    return this.tipos.push(tipoAgenda);
  }

  removeTipoAgenda(tipoAgenda: ITipoAgenda): firebase.Promise<any> {
    return this.tipos.remove(tipoAgenda.$key);
  }

  updateTipoAgenda(tipoAgenda: ITipoAgenda, changes: any): firebase.Promise<any> {
    return this.tipos.update(tipoAgenda.$key, changes);
  }

  getMockTiposDeAgenda(): Observable<ITipoAgenda[]> {
    let data = this._http.get(TIPO_AGENDA_URL);
    return data.map((response: Response) => <ITipoAgenda[]>response.json());
  }

}
