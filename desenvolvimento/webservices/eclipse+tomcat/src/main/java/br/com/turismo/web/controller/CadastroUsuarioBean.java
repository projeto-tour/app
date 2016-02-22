package br.com.turismo.web.controller;

import java.io.Serializable;
import java.util.List;

import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import br.com.turismo.core.enums.EnumTipoOperacao;
import br.com.turismo.core.model.Usuario;
import br.com.turismo.core.repository.Usuarios;

@Named
@ViewScoped
public class CadastroUsuarioBean implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private Usuarios usuarios;

	private Usuario usuario = new Usuario();

	private List<Usuario> todosUsuarios;

	public void inicializar(String operacao) {
		switch (EnumTipoOperacao.getValueOf(operacao)) {
		case LISTAR:
			usuario = new Usuario();
			this.recuperarUsuarios();
			break;
		case INSERIR:
			usuario = new Usuario();
			break;
		case ALTERAR:

			break;
		case EXCLUIR:

			break;

		default:
			break;
		}
	}

	public void recarregar() {
		this.recuperarUsuarios();
	}

	private void recuperarUsuarios() {
		this.todosUsuarios = usuarios.findAll();
	}

	public String inserir() {
		try {
			usuarios.inserir(this.getUsuario());
			this.recuperarUsuarios();
			return "/usuario/ListarUsuarios";
		} catch (Exception e) {
			return "/usuario/InserirUsuario";
		}
	}

	public String alterar() {
		try {
			usuarios.alterar(this.getUsuario());
			this.recuperarUsuarios();
			return "/usuario/ListarUsuarios";
		} catch (Exception e) {
			e.printStackTrace();
			return "/usuario/AlterarUsuario";
		}
	}

	public String excluir() {
		usuarios.remove(this.getUsuario().getId());
		this.recuperarUsuarios();
		return "/usuario/ListarUsuarios";
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public List<Usuario> getTodosUsuarios() {
		return todosUsuarios;
	}

	public void setTodosUsuarios(List<Usuario> todosUsuarios) {
		this.todosUsuarios = todosUsuarios;
	}

}
