/**
 * Referente aos possíveis notifificação pontos de interesse.
 * Ex.: alimentacao, negocio, hospedagem, evento, passeio, etc.
 * 
 * @param $key
 * @param categoria
 * @param titulo
 * @param descricao
 * @param url
 * @param data_hora
 * @param data
 * @param tempo
 */
export class Notificacao {
    categoria: string;
    titulo: string; 
    descricao: string; 
    url: string;
    avatar: string;
    destaque: string;
    data_hora: string;
    data: string;
    tempo: string;

    constructor(obj?: any) {
        this.categoria = obj && obj.categoria || null;
        this.titulo = obj && obj.titulo || null;
        this.descricao = obj && obj.descricao || null;
        this.url = obj && obj.url || null;
        this.avatar = obj && obj.avatar || null;
        this.destaque = obj && obj.destaque || null;
        this.data_hora = obj && obj.data_hora || null;
        this.data = obj && obj.data || null;
        this.tempo = obj && obj.tempo || null;
    }
}

export interface INotificacao {
    $key?: string;
    categoria: string;
    titulo: string; 
    descricao: string; 
    url: string;
    avatar: string;
    destaque: string;
    data_hora: string;
    data: string;
    tempo: string;
}
