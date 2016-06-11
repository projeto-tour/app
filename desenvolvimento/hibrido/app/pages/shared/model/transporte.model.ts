/**
 * Referente ao meio de transporte utilizado. 
 * Ex.: avião, carro, ônibus, etc ...
 * 
 * @param id 
 * @param tipoTransporte     Tipo de transporte descrito (fk_transporte_tipo_transporte).
 * @param descricao
 */
export class Transporte {
    id: number;
    constructor(public tipoTransporte: TipoTransporte,
        public descricao: string = "") {

    }
}

/**
 * Referente ao tipo de transporte utilizado. 
 * Ex.: aéreo, terrestre, etc.
 * 
 * @param id 
 * @param descricao 
 */
export class TipoTransporte {
    id: number;
    constructor(public descricao: string = "") {

    }
}