package br.com.turismo.webservices.restful;

import java.io.Serializable;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.turismo.core.dao.facade.UsuariosDAOFacade;
import br.com.turismo.core.entities.Usuario;
import br.com.turismo.core.util.geral.JsonUtils;

public class UsuarioRestFul extends ModelRestFulAbstract implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private UsuariosDAOFacade usuariosFacade;
	
	public Response salvarUsuario(String token, String nome, String email, String senha, String alias) {
		try {
			return getResponse(usuariosFacade.salvar(new Usuario(null, nome, email, senha, alias)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response atualizarUsuario(String token, Long id, String nome, String email, String senha, String alias) {
		try {
			return getResponse(usuariosFacade.atualizar(new Usuario(id, nome, email, senha, alias)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response removerUsuario(String token, Long id) {
		try {
			return getResponse(usuariosFacade.remover(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response buscarUsuarioPorId(String token, Long id) {
		try {
			return getResponse(usuariosFacade.buscarPorId(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response buscarUsuarioTodos(String token) {
		try {
			return getResponse(usuariosFacade.buscarTodos());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response buscarUsuarioPorEmailSenha(String token, String email, String senha) {
		try {
			return getResponse(usuariosFacade.buscarPorEmailSenha(email, senha));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response buscarUsuarioPorEmail(String token, String email) {
		try {
			return getResponse(usuariosFacade.buscarPorEmail(email));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response buscarUsuarioPorNome(String token, String nome) {
		try {
			return getResponse(usuariosFacade.buscarPorNome(nome));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

}
