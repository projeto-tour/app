import { UsuarioService } from './usuario.service';

export { UsuarioService };
export { Usuario, IUsuario } from './usuario.model';
export { Endereco } from './endereco.model';

export const USUARIOS_PROVIDERS: any[] = [
  UsuarioService
];