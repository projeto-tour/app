package br.com.turismo.core.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.model.Usuario;
import br.com.turismo.core.repository.Usuarios;

public class UsuariosFacade implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Inject
	private Usuarios usuarios;

	public boolean salvar(Usuario entity) {
		usuarios.salvar(entity);
		return true;
	}

	public Usuario atualizar(Usuario entity) {
		return usuarios.atualizar(entity);
	}

	public boolean remover(Long id) {
		usuarios.remover(id);
		return true;
	}

	public Usuario buscarPorId(Long id) {
		return usuarios.buscarPorId(id);
	}

	public List<Usuario> buscarTodos() {
		return usuarios.buscarTodos();
	}

	public Usuario buscarPorEmail(String email) {
		return usuarios.buscarPorEmail(email);
	}

	public Usuario buscarPorEmailSenha(String email, String senha) {
		return usuarios.buscarPorEmailSenha(email, senha);
	}

	public Usuario buscarPorNome(String nome) {
		return usuarios.buscarPorNome(nome);
	}

}
