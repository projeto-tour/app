package br.com.turismo.core.repository;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import br.com.turismo.core.dao.GenericDAO;
import br.com.turismo.core.model.Avaliacao;

public class Avaliacoes extends GenericDAO<Avaliacao, Long> {

	@Inject
	private EntityManager manager;

	public Avaliacoes() {
		super(Avaliacao.class);
	}

	public List<Avaliacao> buscarPorDescricao(String descricao) {
		return manager.createNamedQuery("Avaliacao.findByDescricao", Avaliacao.class)
				.setParameter("descricao", descricao)
				.getResultList();
	}
}
