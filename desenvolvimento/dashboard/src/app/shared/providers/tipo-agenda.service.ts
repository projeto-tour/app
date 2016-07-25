import { Injectable, bind } from '@angular/core';
import { Http } from '@angular/http';

import { ITipo, Tipo } from '../';

@Injectable()
export class TipoAgendaService {

    tipos: ITipo[] = [];

    constructor(private _http: Http) { 
      this.tipos.push(new Tipo('Teste 1'));
      this.tipos.push(new Tipo('Teste 2'));
      this.tipos.push(new Tipo('Teste 3'));
      this.tipos.push(new Tipo('Teste 4'));
      this.tipos.push(new Tipo('Teste 5'));
    }

    create(tipo: any): any {
      return true;
    }

    remove(tipo: any): any {
      return true;
    }

    update(tipo: any, changes: any): any {
      return true;
    }
}

export var tipoAgendaServiceInjectables: Array<any> = [
  bind(TipoAgendaService).toClass(TipoAgendaService)
];