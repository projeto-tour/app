/**
 * Referente a agenda de usuario.
 * Ex.: XXXX, XXXX, etc.
 *
 * @param $key
 * @param descricao
 * @param favorito
 * @param data_inicio
 * @param data_fim
 * @param data_criacao
 * @param distancia
 * @param tipo_agenda
 * @param usuario
 * @param rota
 */
export class Agenda implements IAgenda {
    descricao: string;
    favorito: boolean;
    data_inicio: string;
    data_fim: string;
    data_criacao: string;
    distancia: string;
    tipo_agenda: any;

    constructor(obj?: any) {
        this.descricao = obj && obj.descricao || null;
        this.favorito = obj && obj.favorito || false;
        this.data_inicio = obj && obj.data_inicio || null;
        this.data_fim = obj && obj.data_fim || null;
        this.data_criacao = obj && obj.data_criacao || null;
        this.distancia = obj && obj.distancia || '0 KM';
        this.tipo_agenda = obj && obj.tipo_agenda || null;
    }
}

export interface IAgenda {
    $key?: string;
    descricao: string;
    favorito: boolean;
    data_inicio: string;
    data_fim: string;
    data_criacao: string;
    distancia: string;
    tipo_agenda: any;
    usuario?: any;
    rota?: any;
}
