/**
 * Referente aos possíveis pontos de interesse.
 * Ex.: alimentacao, negocio, hospedagem, evento, passeio, etc.
 * 
 * @param id
 * @param tipoPontoInteresse
 * @param descricao     descrição do ponto de interesse
 * @param localizacao   Localização do ponto de interesse. Pode ser por geolocalizacao ou inserção manual do usuário.
 * @param observacao    Observação sobre o ponto de interesse, se houver.
 */
export class PontoInteresse {
    id: number;
    localizacao: string;
    observacao: string;
    constructor(public tipoPontoInteresse: TipoPontoInteresse,
        public descricao: string = "") {

    }
}

/**
 * Referente aos tipos possíveis de pontos de interesse.
 * Ex.: alimentacao, negocio, hospedagem, evento, passeio, etc.
 * 
 * @param id 
 * @param descricao 
 */
export class TipoPontoInteresse {
    id: number;
    constructor(public descricao: string = "") {

    }
}

/**
 * Referente ao valor e obrigatoriedade de caracteristica de pontos de interesse.
 * 
 * @param id 
 * @param tipoPontoInteresse
 * @param caracteristica
 * @param obrigatorio           Se a caracteristica é ou não obrigatória.
 * @param valor                 Valor da característica
 */
export class CaracteristicaTipoPontoInteresse {
    id: number;
    valor: string;
    constructor(public tipoPontoInteresse: TipoPontoInteresse,
        public caracteristica: Caracteristica,
        public obrigatorio: boolean = false) {

    }
}

/**
 * Referente as possíveis caracteristica de pontos de interesse.
 * Ex.: Hospedagem 5 estrelas, etc.
 * 
 * @param id 
 * @param tipoDado 
 * @param descricao 
 */
export class Caracteristica {
    id: number;
    constructor(public tipoDado: TipoDado, public descricao: string = "") {

    }
}

/**
 * Referente ao tipo de dados do atributo.
 * Ex.: texto, inteiro, float, etc.
 * Usado para facilitar a conversao dos dados para as aplicacoes.
 * 
 * @param id 
 * @param descricao 
 */
export class TipoDado {
    id: number;
    constructor(public descricao: string = "") {

    }
}