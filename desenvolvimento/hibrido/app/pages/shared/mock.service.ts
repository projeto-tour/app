import { Injectable } from '@angular/core';

import { AgendaService, TipoAgendaService, IAgenda, ITipoAgenda } from '../../providers/agendas';

@Injectable()
export class MockService {

    constructor(
        private _tipoAgendaService: TipoAgendaService,
        private _agendaService: AgendaService) {
    }

    generateMockTiposDeAgenda(): void {
        this._tipoAgendaService.getMockTiposDeAgenda()
            .subscribe(
            (tipos: ITipoAgenda[]) => { //-- on sucess
                tipos.forEach(tipo => {
                    this._tipoAgendaService.createTipoAgenda({
                        descricao: tipo.descricao,
                        destaque: tipo.destaque,
                        icone: tipo.icone
                    });
                });
            });
    }

    private getAgendas(): void {
        this._agendaService.getMockAgendas()
            .subscribe(
            (agendas: IAgenda[]) => { //-- on sucess
                agendas.forEach(agenda => {
                    this._agendaService.createAgenda({
                        descricao: agenda.descricao,
                        dataInicio: agenda.dataInicio,
                        dataFim: agenda.dataFim,
                        distancia: agenda.distancia,
                        favorito: agenda.favorito,
                        tipoAgenda: agenda.tipoAgenda,
                        dataCriacao: agenda.dataCriacao
                    });
                });
            });
    }

}