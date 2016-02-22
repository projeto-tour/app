package br.com.turismo.core.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.model.TipoTransporte;
import br.com.turismo.core.repository.TiposTransporte;

public class TiposTransporteFacade implements Serializable
{
	private static final long serialVersionUID = 1L;

	@Inject
	private TiposTransporte tiposTransporte;
	
	public boolean inserir(TipoTransporte entity) {
		tiposTransporte.inserir(entity);
		return true;
    }

    public TipoTransporte alterar(TipoTransporte entity) {
		return tiposTransporte.alterar(entity);
    }

    public boolean remove(Integer id) {
		tiposTransporte.remove(id);
		return true;
    }

    public TipoTransporte find(Integer id) 
    {
        return tiposTransporte.find(id);
    }

    public List<TipoTransporte> findAll() {
		return tiposTransporte.findAll();
    }
}
