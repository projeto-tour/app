export class Notificacao {
    id: number;
    dataHora: string = "";
    data: string = "";
    tempo: string = "";
    constructor(public categoria: string = "",
                public titulo: string = "", 
                public descricao: string = "", 
                public url: string = "") {
                }
}