import { Usuario } from '../shared';

export class UsuarioView extends Usuario {
    logado: boolean = false;
    verificado: boolean = false;
}

export class Endereco {
    logradouro: String = '';
    pais: String = 'Brazil';
    latitude: String = '';
    longitude: String = '';
    constructor(public cidade: String = '', 
                public estado: String = 'SP') {
                    
                }
}