/**
 * Referente ao usuario do aplicativo
 * 
 * @param uid 
 * @param displayName 
 * @param email 
 * @param photoURL 
 * @param providerId 
 */
export class Usuario implements IUsuario {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    providerId: string;

    constructor(obj?: any) {
        this.uid = obj && obj.uid || null;
        this.displayName = obj && obj.displayName || null;
        this.email = obj && obj.email || null;
        this.photoURL = obj && obj.photoURL || null;
        this.providerId = obj && obj.providerId || null;
    }
}

export interface IUsuario {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    providerId: string;
    agenda?: any;
    avaliacao_usuario?: any;
    preferencia_usuario?: any;
}