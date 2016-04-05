package br.com.turismo.webservices.restful;

import java.io.Serializable;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.turismo.core.dao.facade.TiposTransporteFacade;
import br.com.turismo.core.entities.TipoTransporte;
import br.com.turismo.core.util.geral.JsonUtils;

public class TipoTransporteRestFul extends ModelRestFulAbstract implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private TiposTransporteFacade tiposTransporteFacade;

	public Response salvarTipoTransporte(String token, String descricao) {
		try {
			return getResponse(tiposTransporteFacade.salvar(new TipoTransporte(descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response atualizarTipoTransporte(String token, Integer id, String descricao) {
		try {
			return getResponse(tiposTransporteFacade.atualizar(new TipoTransporte(id, descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response removerTipoTransporte(String token, Integer id) {
		try {
			return getResponse(tiposTransporteFacade.remover(id));
		} catch (Exception e) {
			return Response.ok().entity(e.getMessage()).build();
		}
	}

	public Response buscarTipoTransportePorId(String token, Integer id) {
		try {
			return getResponse(tiposTransporteFacade.buscarPorId(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response buscarTipoTransporteTodos(String token) {
		try {
			return getResponse(tiposTransporteFacade.buscarTodos());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response buscarTipoTransportePorDescricao(String token, String descricao) {
		try {
			return getResponse(tiposTransporteFacade.buscarPorDescricao(descricao));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

}
