import { ITipo } from './tipo.model';

/**
 * Referente ao meio de transporte utilizado. 
 * Ex.: avião, carro, ônibus, etc ...
 * 
 * @param key
 * @param descricao
 * @param icone 
 * @param destaque
 * @param tipo_transporte
 */
export class Transporte implements ITransporte {
    descricao: string;
    icone: string;
    destaque: string;
    tipo_transporte: string;

    constructor(obj?: any) {
        this.descricao = obj && obj.descricao || null;
        this.icone = obj && obj.icone || 'info';
        this.destaque = obj && obj.destaque || 'http://placeimg.com/320/240/nature';
        this.tipo_transporte = obj && obj.tipo_transporte || null;
    }
}

export interface ITransporte extends ITipo {
    $key?: string;
    tipo_transporte: string;
    rota?: any;
}
