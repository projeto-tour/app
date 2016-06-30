export class Endereco {
    logradouro: string = '';
    bairro: string = '';
    pais: string = "Brazil";
    latitude: string = '';
    longitude: string = '';

    constructor(
        public cidade: string = '', 
        public estado: string = 'SP') {
        }
}