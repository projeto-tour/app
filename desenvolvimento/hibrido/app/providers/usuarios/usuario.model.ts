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
export class Usuario implements IUsuario {
    data: number = firebase.database['ServerValue']['TIMESTAMP'];

    constructor(
        public email: string = "",
        public senha: string = "",
        public avatar?: string) {
    }
}

export interface IUsuario {
    $key?: string;
    email: string;
    senha: string;
    nome?: string;
    alias?: string;
    avatar?: string;
    data: number;
}

