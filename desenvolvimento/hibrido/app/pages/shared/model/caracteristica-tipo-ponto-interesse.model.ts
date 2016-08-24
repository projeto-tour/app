/**
 * Referente ao valor e obrigatoriedade de caracteristica de pontos de interesse.
 * 
 * @param $key 
 * @param tipo_ponto_interesse
 * @param caracteristica
 * @param obrigatorio           Se a caracteristica é ou não obrigatória.
 * @param valor                 Valor da característica
 */
export class CaracteristicaTipoPontoInteresse implements ICaracteristicaTipoPontoInteresse {
    valor: string;
    obrigatorio: boolean;
    caracteristica: string;
    tipo_ponto_interesse: string;

    constructor(obj?: any) {
        this.valor = obj && obj.valor || null;
        this.obrigatorio = obj && obj.obrigatorio || null;
        this.caracteristica = obj && obj.caracteristica || null;
        this.tipo_ponto_interesse = obj && obj.tipo_ponto_interesse || null;
    }
}

export interface ICaracteristicaTipoPontoInteresse {
    $key?: string;
    valor: string;
    obrigatorio: boolean;
    caracteristica: any;
    tipo_ponto_interesse: any;
}