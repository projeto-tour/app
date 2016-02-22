package br.com.turismo.core.service;

import java.io.Serializable;

import javax.inject.Inject;

import br.com.turismo.core.model.Usuario;
import br.com.turismo.core.repository.Usuarios;
import br.com.turismo.core.util.jpa.Transactional;

public class UsuariosService implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private Usuarios usuarios;

	public Usuario controleacesso(String email, String senha) {
		return usuarios.pesquisarPorEmailSenha(email, senha);
	}

	@Transactional
	public Usuario cadastrar(Usuario usuario) {
		Usuario usuarioExistente = usuarios.pesquisarPorEmail(usuario
				.getEmail());

		if (usuarioExistente != null && !usuarioExistente.equals(usuario)) {
			throw new NegocioException(
					"Já existe um usuario com o email informado.");
		}

		return usuarios.alterar(usuario);
	}

}
