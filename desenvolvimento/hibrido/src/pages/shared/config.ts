import { OpaqueToken } from '@angular/core';

import { IFirebaseConfig } from './model/firebase-config.model';

// export interface FirebaseConfig {
//     agenda: string;
//     avaliacao: string;
//     avaliacao_usuario: string;
//     caracteristica: string;
//     caracteristica_tipo_ponto_interesse: string;
//     item: string;
//     notificacao: string;
//     ponto_interesse: string;
//     preferencia_usuario: string;
//     rota: string;
//     tipo_agenda: string;
//     tipo_dado: string;
//     tipo_ponto_interesse: string;
//     tipo_transporte: string;
//     tipo: string;
//     transporte: string;
//     usuario: string;
// }
export const FIREBASE_URLS_CONFIG: IFirebaseConfig = {
    agenda: '/agenda',
    avaliacao: '/avaliacao',
    avaliacao_usuario: '/avaliacao_usuario',
    caracteristica: '/caracteristica',
    caracteristica_tipo_ponto_interesse: '/caracteristica_tipo_ponto_interesse',
    item: '/item',
    notificacao:  '/notificacao',
    ponto_interesse: '/ponto_interesse',
    preferencia_usuario: '/preferencia_usuario',
    rota: '/rota',
    tipo_agenda: '/tipo_agenda',
    tipo_dado: '/tipo_dado',
    tipo_ponto_interesse: '/tipo_ponto_interesse',
    tipo_transporte: '/tipo_transporte',
    tipo: '/tipo',
    transporte: '/transporte',
    usuario: '/usuario',
};
export let FIREBASE_CONFIG = new OpaqueToken('FirebaseConfig');

export const CONFIG_PROVIDERS = [
    { provide: FIREBASE_CONFIG, useValue: FIREBASE_URLS_CONFIG }
];
