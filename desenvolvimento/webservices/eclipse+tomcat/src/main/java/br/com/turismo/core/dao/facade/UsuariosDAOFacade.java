package br.com.turismo.core.dao.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.dao.UsuarioDAO;
import br.com.turismo.core.entities.Usuario;

public class UsuariosDAOFacade implements Serializable {
	
	private static final long serialVersionUID = -7928004946766061967L;

	@Inject
	private UsuarioDAO usuarioDAO;

	public boolean salvar(Usuario usuario) {
		usuarioDAO.salvar(usuario);
		return true;
	}

	public Usuario atualizar(Usuario usuario) {
		return usuarioDAO.atualizar(usuario);
	}

	public boolean remover(Long id) {
		usuarioDAO.remover(id);
		return true;
	}

	public Usuario buscarPorId(Long id) {
		return usuarioDAO.buscarPorId(id);
	}

	public List<Usuario> buscarTodos() {
		return usuarioDAO.buscarTodos();
	}

	public Usuario buscarPorEmail(String email) {
		return usuarioDAO.buscarPorEmail(email);
	}

	public Usuario buscarPorEmailSenha(String email, String senha) {
		return usuarioDAO.buscarPorEmailSenha(email, senha);
	}

	public Usuario buscarPorNome(String nome) {
		return usuarioDAO.buscarPorNome(nome);
	}

}
