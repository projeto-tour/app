import { ITipo } from './tipo.model';

/**
 * Referente caracteristicas de tipo de dado. 
 * Ex.: avião, carro, ônibus, etc ...
 * 
 * @param key
 * @param descricao
 * @param icone 
 * @param destaque
 * @param tipo_dado
 */
export class Caracteristica implements ICaracteristica {
    descricao: string;
    icone: string;
    destaque: string;
    tipo_dado: string;

    constructor(obj?: any) {
        this.descricao = obj && obj.descricao || null;
        this.icone = obj && obj.icone || 'info';
        this.destaque = obj && obj.destaque || 'http://placeimg.com/320/240/nature';
        this.tipo_dado = obj && obj.tipo_dado || null;
    }
}

export interface ICaracteristica extends ITipo {
    $key?: string;
    tipo_dado: string;
    caracteristicas_tipo_ponto_interesse?: any;
}