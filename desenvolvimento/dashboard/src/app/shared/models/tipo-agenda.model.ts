import { ITipo } from './tipo.model';

/**
 * Referente ao tipo de agenda. 
 * Ex.: XXXX, XXXX, etc.
 * 
 * @param key
 * @param descricao
 * @param icone 
 * @param destaque
 */
export class TipoAgenda implements ITipoAgenda {
    descricao: string;
    icone: string;
    destaque: string;

    constructor(obj?: any) {
        this.descricao = obj && obj.descricao || null;
        this.icone = obj && obj.icone || 'info';
        this.destaque = obj && obj.destaque || 'http://placeimg.com/320/240/nature';
    }
}

export interface ITipoAgenda extends ITipo {
    $key?: string;
    agendas?: any;
}