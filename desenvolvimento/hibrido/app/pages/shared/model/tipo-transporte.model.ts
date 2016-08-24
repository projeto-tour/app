import { ITipo } from './tipo.model';

/**
 * Referente ao tipo de transporte. 
 * Ex.: XXXX, XXXX, etc.
 * 
 * @param key
 * @param descricao
 * @param icone 
 * @param destaque
 */
export class TipoTransporte implements ITipoTransporte {
    descricao: string;
    icone: string;
    destaque: string;

    constructor(obj?: any) {
        this.descricao = obj && obj.descricao || null;
        this.icone = obj && obj.icone || 'info';
        this.destaque = obj && obj.destaque || 'http://placeimg.com/320/240/nature';
    }
}

export interface ITipoTransporte extends ITipo {
    $key?: string;
    transporte?: any;
}
