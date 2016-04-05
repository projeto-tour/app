package br.com.turismo.negocio.messages;

import java.util.Locale;
import java.util.ResourceBundle;

public class Mensagens {

	private static ResourceBundle resource;
	
	public static String getMensagem(Locale locale, String chave){
		
		if (locale == null) {locale = new Locale("pt", "BR");}
		
		resource = ResourceBundle.getBundle(Mensagens.class.getPackage().getName() + "/mensagens", locale);
		return resource.getString(chave);
	}
	
}
