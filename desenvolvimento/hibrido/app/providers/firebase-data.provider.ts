import { Injectable } from '@angular/core';

import { Usuario } from '../pages/shared';

@Injectable()
export class FirebaseDataProvider {

    public tiposAgenda: any;
    public tiposDado: any;
    public tiposPontoInteresse: any;
    public tiposTransporte: any;
    public usuarios: any;

    constructor() {
        // this.tiposAgenda = firebase.database().ref('/tiposAgenda/');
        // this.tiposDado = firebase.database().ref('/tiposDado/');
        // this.tiposPontoInteresse = firebase.database().ref('/tiposPontoInteresse/');
        // this.tiposTransporte = firebase.database().ref('/tiposTransporte/');
        // this.usuarios = firebase.database().ref('/usuarios/');
    }

    setUsuario(usuario: Usuario) {
        // firebase.database().ref('/usuarios/' + usuario.id).set({
        //   nome: usuario.nome,
        //   email: usuario.email,
        //   alias: usuario.alias,
        //   senha: usuario.senha,
        // });
    }
}