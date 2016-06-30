import { Endereco } from './endereco.model';

/**
 * Referente ao usuario do aplicativo
 * 
 * @param id 
 * @param nome      Nome do usuário
 * @param senha     Senha do usuário
 * @param email     E-mail do usuário (deve ser único)
 * @param alias     Alias do usuário (deve ser único)
 * @param data      Data de criação de usuário (deve ser único)
 */
export class Usuario implements IUsuario{
    data: number = firebase.database['ServerValue']['TIMESTAMP'];
    photoURL: string = '';
    providerId: string = '';
    uid: string = '';
    endereco: Endereco = new Endereco();

    constructor(
        public displayName: string = '',
        public email: string = '',
        public password: string = '') {
    }
}

export interface IUsuario {
    photoURL: string;
    providerId: string;
    uid: string;
    endereco: Endereco;
    displayName: string;
    email: string;
    password: string;
}
