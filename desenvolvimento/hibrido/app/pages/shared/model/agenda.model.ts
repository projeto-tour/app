import { Usuario } from '../../../providers/usuarios';

/**
 * Referente a agenda de usuario. 
 * Ex.: XXXX, XXXX, etc.
 * 
 * @param id            
 * @param usuario            
 * @param tipoAgenda    Tipo de agenda
 * @param descricao     Descrição do tipo de agenda.
 */
export class Agenda {
    id: number;
    constructor(public usuario: Usuario,
        public tipoAgenda: TipoAgenda,
        public descricao: string = "",
        public dataInicio: string = "",
        public dataFim: string = "",
        public dataCriacao: string = "") {

    }
}

/**
 * Referente ao tipo de agenda. 
 * Ex.: XXXX, XXXX, etc.
 * 
 * @param id 
 * @param descricao     Descrição do tipo de agenda.
 */
export class TipoAgenda {
    id: number;
    constructor(public descricao: string = "") {

    }
}