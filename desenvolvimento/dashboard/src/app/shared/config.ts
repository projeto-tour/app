import { OpaqueToken } from '@angular/core';

export interface FirebaseConfig {
    tipo_agenda: string;
    tipo_dado: string;
    tipo_transporte: string;
    tipo_ponto_interesse: string;
}
export const FIREBASE_URLS_CONFIG: FirebaseConfig = {
    tipo_agenda: '/tipos_agenda',
    tipo_dado: '/tipos_dado',
    tipo_transporte: '/tipos_transporte',
    tipo_ponto_interesse: '/tipos_ponto_interesse'
};
export let FIREBASE_CONFIG = new OpaqueToken('FirebaseConfig');

export const CONFIG_PROVIDERS = [
  { provide: FIREBASE_CONFIG, useValue: FIREBASE_URLS_CONFIG }
];