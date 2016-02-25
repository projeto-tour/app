package br.com.turismo.webservices.restful;

import java.io.IOException;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

public abstract class ModelRestFulAbstract {

	ObjectMapper mapper = new ObjectMapper();

	public Response aplicacao(String token) {
		try {
			return getResponse(ModelRestFulAbstract.class.getPackage());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response getResponse(Object result) throws JsonGenerationException, JsonMappingException, IOException {
		return Response.ok().entity(mapper.writeValueAsString(result)).build();
	}

	public String toJsonString(Object object) {
		try {
			return mapper.writeValueAsString(object);
		} catch (Exception e) {
			return e.getMessage();
		}
	}
}
