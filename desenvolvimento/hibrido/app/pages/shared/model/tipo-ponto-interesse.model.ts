import { ITipo } from './tipo.model';

/**
 * Referente ao tipo de ponto interesse. 
 * Ex.: XXXX, XXXX, etc.
 * 
 * @param key
 * @param descricao
 * @param icone 
 * @param destaque
 */
export class TipoPontoInteresse implements ITipoPontoInteresse {
    descricao: string;
    icone: string;
    destaque: string;

    constructor(obj?: any) {
        this.descricao = obj && obj.descricao || null;
        this.icone = obj && obj.icone || 'info';
        this.destaque = obj && obj.destaque || 'http://placeimg.com/320/240/nature';
    }
}

export interface ITipoPontoInteresse extends ITipo {
    $key?: string;
    preferencia_usuario?: any;
    caracteristica_tipo_ponto_interesse?: any;
    ponto_interesse?: any;
}
