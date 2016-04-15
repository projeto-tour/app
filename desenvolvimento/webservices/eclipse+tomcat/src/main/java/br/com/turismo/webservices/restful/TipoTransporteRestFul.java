package br.com.turismo.webservices.restful;

import java.io.Serializable;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.turismo.core.dao.facade.TipoTransporteDAOFacade;
import br.com.turismo.core.entities.TipoTransporte;
import br.com.turismo.core.util.geral.JsonUtils;

public class TipoTransporteRestFul extends ModelRestFulAbstract implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private TipoTransporteDAOFacade tiposTransporteDAOFacade;

	public Response salvarTipoTransporte(String token, String descricao) {
		try {
			return getResponse(tiposTransporteDAOFacade.salvar(new TipoTransporte(descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response atualizarTipoTransporte(String token, Long id, String descricao) {
		try {
			return getResponse(tiposTransporteDAOFacade.atualizar(new TipoTransporte(id, descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response removerTipoTransporte(String token, Long id) {
		try {
			return getResponse(tiposTransporteDAOFacade.remover(id));
		} catch (Exception e) {
			return Response.ok().entity(e.getMessage()).build();
		}
	}

	public Response buscarTipoTransportePorId(String token, Long id) {
		try {
			return getResponse(tiposTransporteDAOFacade.buscarPorId(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response buscarTipoTransporteTodos(String token) {
		try {
			return getResponse(tiposTransporteDAOFacade.buscarTodos());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response buscarTipoTransportePorDescricao(String token, String descricao) {
		try {
			return getResponse(tiposTransporteDAOFacade.buscarPorDescricao(descricao));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

}
