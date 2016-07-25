export class Tipo implements ITipo {
    descricao: string;

    constructor(descricao: string) {
        this.descricao = descricao;
    }
}

export interface ITipo {
    $key?: string;
    descricao: string;
}
