/**
 * Referente a avaliação de usuario ao ponto de interesse
 * 
 * @param $key 
 * @param data_saida 
 * @param data_chegada 
 * @param ponto_partida 
 * @param ponto_chegada 
 * @param distancia
 * @param duracao
 * @param rota_pai
 * @param agenda 
 * @param ponto_interesse
 * @param transporte
 */
export class Rota implements IRota {
    data_saida: string;
    data_chegada: string;
    ponto_partida: string;
    ponto_chegada: string;
    localizacao_ponto_partida: any;
    localizacao_ponto_chegada: any;
    distancia: string;
    duracao: string;
    rota_pai: any;
    agenda: any;
    ponto_interesse: any;
    transporte: any;

    constructor(obj?: any) {
        this.data_saida = obj && obj.data_saida || null;
        this.data_chegada = obj && obj.data_chegada || null;
        this.ponto_partida = obj && obj.ponto_partida || null;
        this.ponto_chegada = obj && obj.ponto_chegada || null;
        this.localizacao_ponto_partida = obj && obj.localizacao_ponto_partida || null;
        this.localizacao_ponto_chegada = obj && obj.localizacao_ponto_chegada || null;
        this.distancia = obj && obj.distancia || null;
        this.duracao = obj && obj.duracao || null;
        this.rota_pai = obj && obj.rota_pai || null;
        this.agenda = obj && obj.agenda || null;
        this.ponto_interesse = obj && obj.ponto_interesse || null;
        this.transporte = obj && obj.transporte || null;
    }
}

export interface IRota {
    $key?: string;
    data_saida: string;
    data_chegada: string;
    ponto_partida: string;
    ponto_chegada: string;
    localizacao_ponto_partida: any;
    localizacao_ponto_chegada: any;
    distancia: string;
    duracao: string;
    rota_pai: any;
    agenda: any;
    ponto_interesse: any;
    transporte: any;
}