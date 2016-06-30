import { UsuarioService } from './usuario.service';

export { UsuarioService };
export { IUsuario, Usuario } from './usuario.model';

export const USUARIOS_PROVIDERS: any[] = [
  UsuarioService
];