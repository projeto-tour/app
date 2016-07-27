import { Injectable, bind, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ITipo, Tipo } from '../';
import { FIREBASE_CONFIG, FirebaseConfig } from '../config';

import { ExceptionService } from '../providers/exception.service';
import { ProgressBarService } from '../providers/progress-bar.service';

@Injectable()
export class TipoAgendaService {

  public tipos: FirebaseListObservable<any>;
  
  private filter: ReplaySubject<any> = new ReplaySubject(1);
  public filteredTipos: FirebaseListObservable<any>;

  constructor(
    private _angularFire: AngularFire,
    private _exceptionService: ExceptionService,
    private _progressBarService: ProgressBarService,
    @Inject(FIREBASE_CONFIG) _firebaseConfig: FirebaseConfig) {

    this.tipos = _angularFire.database.list(_firebaseConfig.tipo_agenda);

    this.filteredTipos = _angularFire.database.list(_firebaseConfig.tipo_agenda, { query: {
      orderByChild: 'descricao',
      equalTo: this.filter
    } });
    
  }
  
  filterBy(descricao: string) {
    this.filter.next(descricao); 
  }

  create(tipo: Tipo): firebase.Promise<any> {
    console.log('create>> tipo:'+JSON.stringify(tipo));
    this._progressBarService.show();
    return this.tipos.push(tipo)
      .then((data) => {
        this._progressBarService.hide();
      })
      .catch((error) => {
        this._progressBarService.hide();
        this._exceptionService.catchBadResponse(error)
      });
  }

  update(tipo: ITipo, changes: any): firebase.Promise<any> {
    console.log('update>> tipo:'+JSON.stringify(tipo)+'  changes: '+JSON.stringify(changes));
    this._progressBarService.show();
    return this.tipos.update(tipo.$key, changes)
      .then((data) => {
        this._progressBarService.hide();
      })
      .catch((error) => {
        this._progressBarService.hide();
        this._exceptionService.catchBadResponse(error)
      });
  }

  remove(tipo: ITipo): firebase.Promise<any> {
    console.log('remove>> tipo:'+JSON.stringify(tipo));
    this._progressBarService.show();
    return this.tipos.remove(tipo.$key)
      .then((data) => {
        this._progressBarService.hide();
      })
      .catch((error) => {
        this._progressBarService.hide();
        this._exceptionService.catchBadResponse(error)
      });
  }

}

export var tipoAgendaServiceInjectables: Array<any> = [
  bind(TipoAgendaService).toClass(TipoAgendaService)
];