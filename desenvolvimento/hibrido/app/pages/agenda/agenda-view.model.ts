import { Agenda, Rota } from '../shared/model';

export class AgendaView extends Agenda {
    distancia: string;
    favorito: boolean;
    rotas: Array<Rota> = [];
}
