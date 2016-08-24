/**
 * Referente a avaliação de usuario
 * 
 * @param $key 
 * @param descricao 
 */
export class Avaliacao implements IAvaliacao {
    descricao: string;

    constructor(obj?: any) {
        this.descricao = obj && obj.descricao || null;
    }
}

export interface IAvaliacao {
    $key?: string;
    descricao: string;
    avaliacao_usuario?: any;
}
