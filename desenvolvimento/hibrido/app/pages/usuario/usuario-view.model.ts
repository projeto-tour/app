import { Usuario } from '../shared/model';

export class UsuarioView extends Usuario {
    logado: boolean = false;
    verificado: boolean = false;
    endereco: Endereco = new Endereco();
}

export class Endereco {
    logradouro: String = "";
    pais: String = "Brazil";
    latitude: String = "";
    longitude: String = "";
    constructor(public cidade: String = "", 
                public estado: String = "SP") {
                    
                }
}