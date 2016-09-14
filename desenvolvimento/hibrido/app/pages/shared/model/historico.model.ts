import { ITipoAgenda } from './tipo-agenda.model';
/**
 * Referente ao tipo de agenda. 
 * Ex.: XXXX, XXXX, etc.
 * 
 * @param qtde_todos
 * @param qtde_favoritos
 * @param tipo_agenda
 */
export class Historico implements IHistorico {
    qtde_todos: number;
    qtde_favoritos: number;
    tipo_agenda: ITipoAgenda;

    constructor(obj?: any) {
        this.qtde_todos = obj && obj.qtde_todos || null;
        this.qtde_favoritos = obj && obj.qtde_favoritos || null;
        this.tipo_agenda = obj && obj.tipo_agenda || null;
    }
}

export interface IHistorico {
    qtde_todos: number;
    qtde_favoritos: number;
    tipo_agenda: ITipoAgenda;
}
