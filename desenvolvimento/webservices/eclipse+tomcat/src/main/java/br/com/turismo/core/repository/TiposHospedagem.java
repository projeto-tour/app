package br.com.turismo.core.repository;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import br.com.turismo.core.model.TipoHospedagem;
import br.com.turismo.core.util.jpa.Transactional;

public class TiposHospedagem implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private EntityManager manager;

	@Transactional
    public void inserir(TipoHospedagem entity) {
		manager.persist(entity);
    }

	@Transactional
    public TipoHospedagem alterar(TipoHospedagem entity) {
		return manager.merge(entity);
    }

	@Transactional
    public void remove(Integer id) {
		manager.remove(find(id));
    }

    public TipoHospedagem find(Integer id) 
    {
        return manager.find(TipoHospedagem.class, id);
    }

    public List<TipoHospedagem> findAll() {
		return manager.createNamedQuery("TipoHospedagem.findAll", TipoHospedagem.class).getResultList();
    }
}
