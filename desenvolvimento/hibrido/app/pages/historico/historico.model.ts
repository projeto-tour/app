import { Agenda, TipoAgenda } from '../../providers/agendas';

export class Historico extends TipoAgenda {
    qtdeTodos: number;
    qtdeFavoritos: number;
    agendas: Agenda[] = [];
}