/**
 * Referente aos possíveis pontos de interesse.
 * Ex.: alimentacao, negocio, hospedagem, evento, passeio, etc.
 * 
 * @param id
 * @param tipo_ponto_interesse
 * @param descricao             descrição do ponto de interesse
 * @param localizacao           Localização do ponto de interesse. Pode ser por geolocalizacao ou inserção manual do usuário.
 * @param observacao            Observação sobre o ponto de interesse, se houver.
 */
export class PontoInteresse implements IPontoInteresse {
    descricao: string;
    localizacao: any;
    observacao: string;
    tipo_ponto_interesse: string;

    constructor(obj?: any) {
        this.descricao = obj && obj.descricao || null;
        this.localizacao = obj && obj.localizacao || null;
        this.observacao = obj && obj.observacao || null;
        this.tipo_ponto_interesse = obj && obj.tipo_ponto_interesse || null;
    }
}

export interface IPontoInteresse {
    $key?: string;
    descricao: string;
    localizacao: any;
    observacao: string;
    tipo_ponto_interesse: string;
    avaliacao_usuario?: any;
    rota?: any;
}
