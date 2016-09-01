/**
 * Referente a caracteristica tipo PontoInteresse. 
 * Ex.: XXXX, XXXX, etc.
 * 
 * @param key
 * @param obrigatorio
 * @param valor
 */
export class CaracteristicaTipoPontoInteresse implements ICaracteristicaTipoPontoInteresse {
    obrigatorio: boolean;
    valor: string;
    tipo_ponto_interesse: any;
    caracteristica: any;

    constructor(obj?: any) {
        this.obrigatorio = obj && obj.obrigatorio || null;
        this.valor = obj && obj.valor || null;
        this.tipo_ponto_interesse = obj && obj.tipo_ponto_interesse || null;
        this.caracteristica = obj && obj.caracteristica || null;
    }
}

export interface ICaracteristicaTipoPontoInteresse {
    $key?: string;
    obrigatorio: boolean;
    valor: string;
    tipo_ponto_interesse: any;
    caracteristica: any;
}
