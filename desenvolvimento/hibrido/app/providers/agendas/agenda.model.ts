import { ITipoAgenda, TipoAgenda } from './tipo-agenda.model';
/**
 * Referente a agenda de usuario. 
 * Ex.: XXXX, XXXX, etc.
 * 
 * @param id            
 * @param usuario            
 * @param tipoAgenda    Tipo de agenda
 * @param descricao     Descrição do tipo de agenda.
 */
export class Agenda implements IAgenda {
    dataCriacao: string = firebase.database['ServerValue']['TIMESTAMP'];
    favorito: boolean = false;
    distancia: string = '0 KM';
    
    constructor(
        public tipoAgenda: ITipoAgenda = new TipoAgenda(),
        public descricao: string = "",
        public dataInicio: string = "",
        public dataFim: string = "") {

    }
}

export interface IAgenda {
    $key?: string;
    tipoAgenda: ITipoAgenda;
    descricao: string;
    favorito: boolean;
    dataInicio: string;
    dataFim: string;
    dataCriacao: string;
    distancia: string;
}

