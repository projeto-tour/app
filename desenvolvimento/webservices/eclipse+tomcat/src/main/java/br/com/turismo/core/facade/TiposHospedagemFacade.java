package br.com.turismo.core.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.model.TipoHospedagem;
import br.com.turismo.core.repository.TiposHospedagem;

public class TiposHospedagemFacade implements Serializable
{
	private static final long serialVersionUID = 1L;

	@Inject
	private TiposHospedagem tiposHospedagem;
	
	public boolean inserir(TipoHospedagem entity) {
		tiposHospedagem.inserir(entity);
		return true;
    }

    public TipoHospedagem alterar(TipoHospedagem entity) {
		return tiposHospedagem.alterar(entity);
    }

    public boolean remove(Integer id) {
		tiposHospedagem.remove(id);
		return true;
    }

    public TipoHospedagem find(Integer id) 
    {
        return tiposHospedagem.find(id);
    }

    public List<TipoHospedagem> findAll() {
		return tiposHospedagem.findAll();
    }
}