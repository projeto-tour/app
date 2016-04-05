package br.com.turismo.webservices.restful;

import java.io.IOException;
import java.lang.annotation.Annotation;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.hibernate.mapping.Table;

import br.com.turismo.core.entities.Usuario;
import br.com.turismo.core.util.geral.JsonUtils;

public abstract class ModelRestFulAbstract {

	public Response aplicacao(String token) {
		try {
			
			System.out.println(Usuario.class.getAnnotations());
			Annotation[] annotations =  Usuario.class.getAnnotations();
			
			if (annotations.length > 0){
				for (int i=0;i<annotations.length-1; i++){
					if ("Table".equals(annotations[i].annotationType().getSimpleName())){
						System.out.println(annotations[i].annotationType().getSimpleName());
						Table table = new Table();
						table.getUniqueKeyIterator();
						
					}
				}
			}
			
			return getResponse(Usuario.class.getAnnotations());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	public Response getResponse(Object result) throws JsonGenerationException, JsonMappingException, IOException {
		
		
		return Response.ok().entity(JsonUtils.toJson(result)).build();
	}

	
}
