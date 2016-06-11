import { TipoAgenda } from '../shared/model';
import { AgendaView } from '../agenda';

export class Historico extends TipoAgenda {
    icone: string;
    destaque: string;
    qtdeTodos: number;
    qtdeFavoritos: number;
    agendas: AgendaView[] = [];
}