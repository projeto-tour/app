package br.com.turismo.core.converter;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;
import javax.inject.Inject;

import br.com.turismo.core.dao.UsuarioDAO;
import br.com.turismo.core.entities.Usuario;
import br.com.turismo.core.utils.cdi.CDIServiceLocator;

@FacesConverter(forClass = Usuario.class)
public class UsuarioConverter implements Converter {

	@Inject
	private UsuarioDAO usuarios;

	public UsuarioConverter() {
		if (usuarios == null) {
			usuarios = CDIServiceLocator.getBean(UsuarioDAO.class);
		}
	}

	@Override
	public Object getAsObject(FacesContext context, UIComponent component, String value) {
		Usuario retorno = null;

		if (value != null) {
			retorno = this.usuarios.buscarPorId(new Long(value));
		}

		return retorno;
	}

	@Override
	public String getAsString(FacesContext context, UIComponent component, Object value) {
		if (value != null) {
			Long codigo = ((Usuario) value).getId();
			String retorno = (codigo == null ? null : codigo.toString());

			return retorno;
		}

		return "";
	}

}