package br.com.turismo.webservices.restful;

import java.io.Serializable;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.turismo.core.facade.TiposHospedagemFacade;
import br.com.turismo.core.model.TipoHospedagem;

public class TipoHospedagemRestFul extends ModelRestFulAbstract implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private TiposHospedagemFacade tiposHospedagemFacade;

	public Response salvarTipoHospedagem(String token, String descricao) {
		try {
			return getResponse(tiposHospedagemFacade.salvar(new TipoHospedagem(descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response atualizarTipoHospedagem(String token, Integer id, String descricao) {
		try {
			return getResponse(tiposHospedagemFacade.atualizar(new TipoHospedagem(id, descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response removerTipoHospedagem(String token, Integer id) {
		try {
			return getResponse(tiposHospedagemFacade.remover(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response buscarTipoHospedagemPorId(String token, Integer id) {
		try {
			return getResponse(tiposHospedagemFacade.buscarPorId(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response buscarTipoHospedagemTodos(String token) {
		try {
			return getResponse(tiposHospedagemFacade.buscarTodos());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response buscarTipoHospedagemPorDescricao(String token, String descricao) {
		try {
			return getResponse(tiposHospedagemFacade.buscarPorDescricao(descricao));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

}
