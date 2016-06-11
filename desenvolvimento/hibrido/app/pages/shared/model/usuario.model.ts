/**
 * Referente ao usuario do aplicativo
 * 
 * @param id 
 * @param nome      Nome do usuário
 * @param senha     Senha do usuário
 * @param email     E-mail do usuário (deve ser único)
 * @param alias     Alias do usuário (deve ser único)
 */
export class Usuario {
    id: string;
    constructor(public nome: string = "",
        public senha: string = "",
        public email: string = "",
        public alias: string = "",
        public avatar: string = "") {

    }
}