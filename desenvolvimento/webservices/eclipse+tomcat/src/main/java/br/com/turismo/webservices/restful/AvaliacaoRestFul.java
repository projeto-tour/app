package br.com.turismo.webservices.restful;

import java.io.Serializable;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.turismo.core.dao.facade.AvaliacoesFacade;
import br.com.turismo.core.entities.Avaliacao;
import br.com.turismo.core.util.geral.JsonUtils;

public class AvaliacaoRestFul extends ModelRestFulAbstract implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private AvaliacoesFacade avaliacoesFacade;

	public Response salvarAvaliacao(String token, String descricao) {
		try {
			return getResponse(avaliacoesFacade.salvar(new Avaliacao(descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response atualizarAvaliacao(String token, Long id, String descricao) {
		try {
			return getResponse(avaliacoesFacade.atualizar(new Avaliacao(id, descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response removerAvaliacao(String token, Long id) {
		try {
			return getResponse(avaliacoesFacade.remover(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response buscarAvaliacaoPorId(String token, Long id) {
		try {
			return getResponse(avaliacoesFacade.buscarPorId(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response buscarAvaliacaoTodas(String token) {
		try {
			return getResponse(avaliacoesFacade.buscarTodos());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response buscarAvaliacaoPorDescricao(String token, String descricao) {
		try {
			return getResponse(avaliacoesFacade.buscarPorDescricao(descricao));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

}
