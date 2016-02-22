package br.com.turismo.core.repository;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import br.com.turismo.core.model.Avaliacao;
import br.com.turismo.core.util.jpa.Transactional;

public class Avaliacoes implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private EntityManager manager;

	@Transactional
    public void inserir(Avaliacao entity) {
		manager.persist(entity);
    }

	@Transactional
    public Avaliacao alterar(Avaliacao entity) {
		return manager.merge(entity);
    }

	@Transactional
    public void remove(Long id) {
		manager.remove(find(id));
    }

    public Avaliacao find(Long id) 
    {
        return manager.find(Avaliacao.class, id);
    }

    public List<Avaliacao> findAll() {
		return manager.createNamedQuery("Avaliacao.findAll", Avaliacao.class).getResultList();
    }
}
