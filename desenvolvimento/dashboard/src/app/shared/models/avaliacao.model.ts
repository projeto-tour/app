/**
 * Referente a avaliação de usuario. 
 * Ex.: XXXX, XXXX, etc.
 * 
 * @param key
 * @param descricao
 * @param nota
 */
export class Avaliacao implements IAvaliacao {
    descricao: string;
    nota: number;

    constructor(obj?: any) {
        this.descricao = obj && obj.descricao || null;
        this.nota = obj && obj.nota || null;
    }
}

export interface IAvaliacao {
    $key?: string;
    descricao: string;
    nota: number;
    avaliacao_usuario?: any;
}
