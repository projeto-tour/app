package br.com.turismo.webservices.impl;

import java.util.Locale;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang3.LocaleUtils;

import br.com.turismo.core.entities.Usuario;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.core.util.geral.JsonUtils;
import br.com.turismo.negocio.messages.Mensagens;
import br.com.turismo.webservices.response.ResponseRest;
import br.com.turismo.webservices.restful.ModelRestFulAbstract;

@RequestScoped
public abstract class ServiceAbstract {

	private ResponseRest responseRest;
	private Locale locale;

	public Response aplicacao(String token) {
		try {
			return buildResponse(Usuario.class.getAnnotations());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public ResponseRest getResponseRest() {
		if (responseRest == null) {
			responseRest = new ResponseRest();
		}
		return responseRest;
	}

	public void setResponseRest(ResponseRest responseRest) {
		this.responseRest = responseRest;
	}

	public Locale getLocale() {
		return locale;
	}

	public void setLocale(Locale locale) {
		this.locale = locale;
	}
	
	public void setLocale(String locale) {
		this.locale = LocaleUtils.toLocale(locale);
	}

	public Response buildResponse(Object result) {
		return Response.ok().entity(JsonUtils.toJson(result)).build();
	}

	public Response buildResponse(ResponseRest responseRest) {
		return Response.ok().entity(JsonUtils.toJson(responseRest)).build();
	}

	public Response buildResponse(Status status, ResponseRest responseRest) {
		return Response.status(status).entity(JsonUtils.toJson(responseRest)).build();
	}

	public boolean validarToken(String token) throws NegocioException {

		if ("ok".equals(token)) {
			return true;
		} else {
			throw new NegocioException(Mensagens.getMensagem(null, "M2"));
		}
	}
}
