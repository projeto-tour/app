package br.com.turismo.core.service;

import java.io.Serializable;

import javax.inject.Inject;

import br.com.turismo.core.dao.UsuarioDAO;
import br.com.turismo.core.entities.Usuario;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.core.util.jpa.Transactional;

public class UsuariosService implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private UsuarioDAO usuarios;

	@Transactional
	public Usuario cadastrar(Usuario usuario) {
		Usuario usuarioExistente = usuarios.buscarPorEmail(usuario
				.getEmail());

		if (usuarioExistente != null && !usuarioExistente.equals(usuario)) {
			throw new NegocioException(
					"Já existe um usuario com o email informado.");
		}

		return usuarios.atualizar(usuario);
	}

}
