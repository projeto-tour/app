
/**
 * Referente ao tipo de agenda. 
 * Ex.: XXXX, XXXX, etc.
 * 
 * @param id 
 * @param descricao     Descrição do tipo de agenda.
 */
export class TipoAgenda implements ITipoAgenda {
    destaque: string= 'img/advance-card-map-paris.png';

    constructor(
        public descricao: string = "",
        public icone: string = '') {
    }
}

export interface ITipoAgenda {
    $key?: string;
    descricao: string;
    icone: string;
    destaque: string;
}