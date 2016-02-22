package br.com.turismo.webservices.restful;

import javax.inject.Inject;

import br.com.turismo.core.service.TurismoRestFulService;

public abstract class TurismoRestFulAbstract implements TurismoRestFulInterface {

	@Inject
	protected TurismoRestFulService service;

}
