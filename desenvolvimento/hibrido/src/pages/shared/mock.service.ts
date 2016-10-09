import { Injectable } from '@angular/core';

import { ITipoAgenda } from '../shared';
import { AgendaService, TipoAgendaService } from '../../providers/data';

@Injectable()
export class MockService {

    constructor(
        public _tipoAgendaService: TipoAgendaService,
        public _agendaService: AgendaService) {
    }

    generateMocklistDeAgenda(): void {
        this._tipoAgendaService.getMock()
            .subscribe(
            (list: ITipoAgenda[]) => { // -- on sucess
                list.forEach(tipo => {
                    this._tipoAgendaService.create({
                        descricao: tipo.descricao,
                        destaque: tipo.destaque,
                        icone: tipo.icone
                    });
                });
            });
    }

}
