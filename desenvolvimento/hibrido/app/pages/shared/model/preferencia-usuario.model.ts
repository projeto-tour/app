/**
 * Referente a preferencia usuario
 * 
 * @param $key 
 * @param tipo_ponto_interesse
 */
export class PreferenciaUsuario {
    tipo_ponto_interesse: any;

    constructor(obj?: any) {
        this.tipo_ponto_interesse = obj && obj.tipo_ponto_interesse || null;
    }
}

export interface IPreferenciaUsuario {
    $key?: string;
    tipo_ponto_interesse: any;
}
