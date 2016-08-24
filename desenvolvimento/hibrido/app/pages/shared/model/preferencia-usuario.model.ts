/**
 * Referente a preferencia usuario
 * 
 * @param $key 
 * @param usuario
 * @param tipo_ponto_interesse
 */
export class PreferenciaUsuario {
    usuario: any;
    tipo_ponto_interesse: any;

    constructor(obj?: any) {
        this.usuario = obj && obj.usuario || null;
        this.tipo_ponto_interesse = obj && obj.tipo_ponto_interesse || null;
    }
}

export interface IPreferenciaUsuario {
    $key?: string;
    usuario: any;
    tipo_ponto_interesse: any;
}
