package br.com.turismo.webservices;

import javax.inject.Inject;

import br.com.turismo.webservices.restful.AvaliacaoRestFul;
import br.com.turismo.webservices.restful.TipoTransporteRestFul;
import br.com.turismo.webservices.restful.UsuarioRestFul;

public abstract class TurismoRestFulAbstract implements TurismoRestFulInterface {

	@Inject
	protected AvaliacaoRestFul avaliacaoRestFul;

	@Inject
	protected TipoTransporteRestFul tipoTransporteRestFul;

	@Inject
	protected UsuarioRestFul usuarioRestFul;

}
