import { Agenda, TipoAgenda } from '../../providers/agendas';

export class Historico extends TipoAgenda {
    icone: string;
    destaque: string;
    qtdeTodos: number;
    qtdeFavoritos: number;
    agendas: Agenda[] = [];
}