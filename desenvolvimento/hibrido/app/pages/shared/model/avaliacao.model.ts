import { Usuario, PontoInteresse } from './';

/**
 * Referente a avaliação de usuario a um ponto de interesse
 * 
 * @param id 
 * @param usuario 
 * @param pontoInteresse 
 * @param avaliacao 
 * @param comentario 
 * @param recomendar 
 * @param dataAvaliacao 
 */
export class AvaliacaoUsuario {
    id: number;
    constructor(public usuario: Usuario,
        public pontoInteresse: PontoInteresse,
        public avaliacao: Avaliacao,
        public comentario: string = "",
        public recomendar: boolean,
        public dataAvaliacao: Date) {

    }
}

/**
 * Referente a avaliação de um ponto de interesse
 * 
 * @param id 
 * @param descricao 
 */
export class Avaliacao {
    id: number;
    constructor(public descricao: string = "") {

    }
}