import { Injectable } from '@angular/core';

import { IMenu, IMenuItem } from './menu.model';

import { DesenvolvimentoPage } from '../../pages/desenvolvimento';
import { UsuarioProfilePage, UsuarioSignUpPage } from '../../pages/usuario';
import { TutorialPage } from '../../pages/tutorial';
import { SobrePage } from '../../pages/sobre';
import { CompartilharPage } from '../../pages/compartilhar';
import { ConfiguracaoPage } from '../../pages/configuracao';
import { BagagemPage } from '../../pages/bagagem';

@Injectable()
export class MenuDataService {

  constructor() { }

  getMenuPages(): IMenu[] {
    return [
      {
        "title": "MINHA CONTA",
        "pages": [
          { title: 'Perfil', component: UsuarioProfilePage, status: 'LOGGEDIN', icon: 'person' },
          { title: 'Logout', component: UsuarioSignUpPage, status: 'LOGGEDIN', icon: 'log-out' },
          { title: 'Login', component: UsuarioSignUpPage, status: 'LOGGEDOUT', icon: 'log-in' },
          { title: 'Configurações', component: ConfiguracaoPage, status: 'DEFAULT', icon: 'settings' }
        ]
      },
      {
        "title": "KIT DO TURISTA",
        "pages": [
          { title: 'Taxas de Câmbio', component: DesenvolvimentoPage, status: 'DEFAULT', icon: 'cash' },
          { title: 'Prefixos Telefônicos', component: DesenvolvimentoPage, status: 'DEFAULT', icon: 'call' },
          { title: 'Medidas de Roupa', component: DesenvolvimentoPage, status: 'DEFAULT', icon: 'body' },
          { title: 'Minha Bagagem', component: BagagemPage, status: 'DEFAULT', icon: 'briefcase' }
        ]
      },
      {
        "title": "PARTIU!",
        "pages": [
          { title: 'Ajuda', component: TutorialPage, status: 'DEFAULT', icon: 'md-help-circle' },
          { title: 'Sobre', component: SobrePage, status: 'DEFAULT', icon: 'md-information-circle' },
          { title: 'Compartilhar', component: CompartilharPage, status: 'DEFAULT', icon: 'share' }
        ]
      }
    ];
  }
}