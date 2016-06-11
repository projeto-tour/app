import { Injectable } from '@angular/core';

import { Storage, LocalStorage, Events } from 'ionic-angular';

import { UsuarioView } from '../pages/usuario';

@Injectable()
export class UserDataProvider {

  storage = new Storage(LocalStorage);
  HAS_LOGGED_IN = 'hasLoggedIn';
  _preferencias = [];

  constructor(private _events: Events) { }

  //-- Controle de acesso e gerenciamento de login

  login(usuario: UsuarioView) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsuario(usuario);
    this._events.publish('usuario:login');
  }

  signup(usuario: UsuarioView) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsuario(usuario);
    this._events.publish('usuario:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('usuario');
    this._events.publish('usuario:logout');
  }

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === 'true';
    });
  }

  //-- Usuario logado

  setUsuario(usuario: UsuarioView): Promise<boolean> {
    return this.storage.set('usuario', JSON.stringify(usuario)).then((data) => {
      return true;
    });
  }

  getUsuario(): Promise<UsuarioView> {
    return this.storage.get('usuario').then((data: UsuarioView) => {
      return data;
    });
  }

  //-- Preferencias de usuario

  contemPreferencia(preferencia) {
    return (this._preferencias.indexOf(preferencia) > -1);
  }

  adicionarPreferencia(preferencia) {
    this._preferencias.push(preferencia);
  }

  removerPreferencia(preferencia) {
    let index = this._preferencias.indexOf(preferencia);
    if (index > -1) {
      this._preferencias.splice(index, 1);
    }
  }

}
