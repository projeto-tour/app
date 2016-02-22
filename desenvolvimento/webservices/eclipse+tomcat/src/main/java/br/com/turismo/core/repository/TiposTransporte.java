package br.com.turismo.core.repository;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import br.com.turismo.core.model.TipoTransporte;
import br.com.turismo.core.util.jpa.Transactional;

public class TiposTransporte implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private EntityManager manager;

	@Transactional
    public void inserir(TipoTransporte entity) {
		manager.persist(entity);
    }

	@Transactional
    public TipoTransporte alterar(TipoTransporte entity) {
		return manager.merge(entity);
    }

	@Transactional
    public void remove(Integer id) {
		manager.remove(find(id));
    }

    public TipoTransporte find(Integer id) 
    {
        return manager.find(TipoTransporte.class, id);
    }

    public List<TipoTransporte> findAll() {
		return manager.createNamedQuery("TipoTransporte.findAll", TipoTransporte.class).getResultList();
    }
}
