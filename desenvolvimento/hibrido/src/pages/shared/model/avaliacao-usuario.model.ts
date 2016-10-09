/**
 * Referente a avaliação de usuario a um ponto de interesse
 *
 * @param $key
 * @param usuario 
 * @param ponto_interesse 
 * @param avaliacao 
 * @param comentario 
 * @param recomendar 
 * @param data_avaliacao 
 */
export class AvaliacaoUsuario {
    comentario: string;
    data_avaliacao: string;
    recomendar: boolean;
    usuario: any;
    ponto_interesse: any;
    avaliacao: any;

    constructor(obj?: any) {
        this.comentario = obj && obj.comentario || null;
        this.data_avaliacao = obj && obj.data_avaliacao || null;
        this.recomendar = obj && obj.recomendar || null;
        this.usuario = obj && obj.usuario || null;
        this.ponto_interesse = obj && obj.ponto_interesse || null;
        this.avaliacao = obj && obj.avaliacao || null;
    }
}

export interface IAvaliacaoUsuario {
    $key?: string;
    comentario: string;
    data_avaliacao: string;
    recomendar: boolean;
    usuario: any;
    ponto_interesse: any;
    avaliacao: any;
}
