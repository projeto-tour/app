/**
 * Referente ao endereco de usuario
 * 
 * @param logradouro 
 * @param bairro 
 * @param cidade 
 * @param estado 
 * @param localizacao 
 */
export class Endereco implements IEndereco {
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    localizacao: any;

    constructor(obj?: any) {
        this.logradouro = obj && obj.logradouro || null;
        this.bairro = obj && obj.bairro || null;
        this.cidade = obj && obj.cidade || null;
        this.estado = obj && obj.estado || null;
        this.localizacao = obj && obj.localizacao || null;
    }
}

export interface IEndereco {
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    localizacao: any;
}
