import { OpaqueToken } from '@angular/core';

export interface FirebaseConfig {
    avaliacao: string;
    caracteristica: string;
    caracteristica_tipo_ponto_interesse: string;
    tipo_agenda: string;
    tipo_dado: string;
    tipo_ponto_interesse: string;
    tipo_transporte: string;
    transporte: string;
}

export const FIREBASE_URLS_CONFIG: FirebaseConfig = {
    avaliacao: '/avaliacao',
    caracteristica: '/caracteristica',
    caracteristica_tipo_ponto_interesse: '/caracteristica_tipo_ponto_interesse',
    tipo_agenda: '/tipo_agenda',
    tipo_dado: '/tipo_dado',
    tipo_ponto_interesse: '/tipo_ponto_interesse',
    tipo_transporte: '/tipo_transporte',
    transporte: '/transporte'
};

export let FIREBASE_CONFIG = new OpaqueToken('FirebaseConfig');

export const CONFIG_PROVIDERS = [
  { provide: FIREBASE_CONFIG, useValue: FIREBASE_URLS_CONFIG }
];
