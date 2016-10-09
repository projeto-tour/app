import { ITipo } from './tipo.model';

/**
 * Referente ao tipo de dado. 
 * Ex.: XXXX, XXXX, etc.
 * 
 * @param key
 * @param descricao
 * @param icone 
 * @param destaque
 */
export class TipoDado implements ITipoDado {
    descricao: string;
    icone: string;
    destaque: string;

    constructor(obj?: any) {
        this.descricao = obj && obj.descricao || null;
        this.icone = obj && obj.icone || 'info';
        this.destaque = obj && obj.destaque || 'http://placeimg.com/320/240/nature';
    }
}

export interface ITipoDado extends ITipo {
    $key?: string;
    caracteristica?: any;
}
