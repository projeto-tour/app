package br.com.turismo.webservices.response;

import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ResponseRest {

	private Map<String, Object> dados;
	
	public ResponseRest(){}
	
	public ResponseRest(boolean sucesso, String mensagem){
		this.getDados().put("sucesso", sucesso);
		this.getDados().put("mensagem", mensagem);
	}
	
	public ResponseRest(boolean sucesso, String mensagem, Object valor){
		this.getDados().put("sucesso", sucesso);
		this.getDados().put("mensagem", mensagem);
		this.getDados().put("resposta", valor);
	}
	
	public ResponseRest(boolean sucesso, String mensagem, String chave, Object valor){
		this.getDados().put("sucesso", sucesso);
		this.getDados().put("mensagem", mensagem);
		this.getDados().put(chave, valor);
	}

	public Map<String, Object> getDados() {
		if (dados == null) {
			dados = new HashMap<>();
			dados.put("sucesso", false);
			dados.put("mensagem", "");
		}
		return dados;
	}

	public void setDados(Map<String, Object> dados) {
		this.dados = dados;
	}

	public void setDados(String key, String value) {
		this.getDados().put(key, value);
	}
	
}
