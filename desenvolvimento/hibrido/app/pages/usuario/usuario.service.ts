import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { USUARIO_URL, Usuario } from '../shared';

@Injectable()
export class UsuarioService {

    usuarios: Usuario[] = [];

    constructor(private _http: Http) {
        this.getUsuarios()
            .subscribe((data: Usuario[]) => this.usuarios = data,
            error => this.handleError(<any>error));
    }

    getUsuarios(): Observable<Usuario[]> {
        let data = this._http.get(USUARIO_URL);
        return data.map((response: Response) => <Usuario[]>response.json())
            // .do(data => console.log('getUsuarios: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getUsuario(email: string): Observable<Usuario> {
        return this.getUsuarios()
            .map((lista: Usuario[]) => lista.filter(obj => obj.email.indexOf(email) !== -1))
            // .do(data => console.log('getUsuario: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveUsuario(usuario: Usuario): number {
        return this.usuarios.push(usuario);
    }

    updateUsuario(usuario: Usuario): number {
        return this.usuarios.push(usuario);
    }

    deleteUsuario(id: string): number {
        return 0;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Houve um erro ao conectar com o servidor.');
    }
}
