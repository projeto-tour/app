/**
 * Referente ao tipo de agenda, transporte, dado, ponto de interesse. 
 * Ex.: XXXX, XXXX, etc.
 * 
 * @param key           UIDD
 * @param descricao     Descrição do tipos.
 * @param icone         Icone do tipos quando se aplica.
 * @param destaque      Descrição do tipos quando se aplica.
 */
export class Tipo implements ITipo {
    descricao: string;
    icone: string;
    destaque: string;

    constructor(obj?: any) {
        this.descricao = obj && obj.descricao || null;
        this.icone = obj && obj.icone || 'info';
        this.destaque = obj && obj.destaque || 'http://placeimg.com/320/240/nature';
    }
}

export interface ITipo {
    $key?: string;
    descricao: string;
    icone: string;
    destaque: string;
    relacionamento?: any;
}
