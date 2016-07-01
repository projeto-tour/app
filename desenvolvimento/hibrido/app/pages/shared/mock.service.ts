import { Injectable } from '@angular/core';

import { AgendaService, TipoAgendaService, IAgenda, ITipoAgenda } from '../../providers/agendas';

@Injectable()
export class MockService {

    constructor(
        private _tipoAgendaService: TipoAgendaService) {
    }

    generateMockTiposDeAgenda(): void {
        this._tipoAgendaService.getMockTiposDeAgenda()
            .subscribe(
            (data: ITipoAgenda[]) => { //-- on sucess
                data.forEach(tipoAgenda => {
                    this._tipoAgendaService.createTipoAgenda({
                        descricao: tipoAgenda.descricao,
                        destaque: tipoAgenda.destaque,
                        icone: tipoAgenda.icone
                    });
                });
            });
    }

}