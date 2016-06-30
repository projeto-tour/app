import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { FirebaseAuthService } from '../auth';

import { Usuario } from './usuario.model';

@Injectable()
export class UsuarioService {
    
    usuario: FirebaseObjectObservable<any>;

    constructor(
        _af: AngularFire,
        _auth: FirebaseAuthService) {
        this.usuario = _af.database.object(`/usuarios/${_auth.id}`)
    }

    getUsuario(): FirebaseObjectObservable<any> {
        return this.usuario;
    }

    createUsuario(usuario: any): firebase.Promise<any> {
        return this.usuario.set(usuario);
    }

    removeUsuario(): firebase.Promise<any> {
        return this.usuario.remove();
    }

}
