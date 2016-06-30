import { Usuario } from '../../../providers/usuarios';
import { TipoPontoInteresse } from './';

/**
 * Referente a preferencia usuario
 * 
 * @param id 
 * @param usuario
 * @param tipoPontoInteresse
 */
export class PreferenciaUsuario {
    id: number;
    constructor(public usuario: Usuario,
        public tipoPontoInteresse: TipoPontoInteresse) {

    }
}