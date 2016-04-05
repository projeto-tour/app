package br.com.turismo.core.util.geral;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

public class JsonUtils {

	private static ObjectMapper mapper = new ObjectMapper();

	public static String getStringFromObject(Object obj)
			throws JsonGenerationException, JsonMappingException, IOException {
		return mapper.writeValueAsString(obj);
	}

	public static String toJson(Object object) {
		try {
			return mapper.writeValueAsString(object);
		} catch (Exception e) {
			return e.getMessage();
		}
	}
}
