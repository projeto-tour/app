/**
 * Referente ao um objeto generico
 * 
 * @param $key 
 * @param descricao 
 * @param status 
 */
export class Item {
    descricao: string;
    status: boolean;

    constructor(obj?: any) {
        this.descricao = obj && obj.descricao || null;
        this.status = obj && obj.status || null;
    }
}

export interface IItem {
    $key?: string;
    descricao: string;
    status: boolean;
}
