import { Agenda, PontoInteresse, Transporte } from './';

/**
 * Referente a avaliação de usuario ao ponto de interesse
 * 
 * @param id 
 * @param rotaPai 
 * @param agenda 
 * @param pontoInteresse 
 * @param transporte 
 * @param dataSaida         Data e hora previstas para início do percurso
 * @param dataChegada       Data e hora previstas para o término do percurso
 * @param pontoPartida      Ponto de partida (pode conter dado de geolocalização ou informação digitada pelo usuário)
 * @param pontoChegada 
 * @param distancia         Distância em metros entre os pontos.
 */
export class Rota {
    id: number;
    distancia: string;
    duracao: string;
    constructor(public rotaPai: Rota,
        public agenda: Agenda,
        public pontoInteresse: PontoInteresse,
        public transporte: Transporte,
        public dataSaida: string = "",
        public dataChegada: string = "",
        public pontoPartida: string = "",
        public pontoChegada: string = "") {

    }
}