package br.com.turismo.core.dao;

import javax.persistence.NoResultException;

import br.com.turismo.core.entities.Avaliacao;


public class AvaliacaoDAO extends GenericDAO<Avaliacao, Long> {

	public AvaliacaoDAO() {
		super(Avaliacao.class);
	}

	public Avaliacao buscarPorDescricao(String descricao) {
		try {
			return manager.createNamedQuery("Avaliacao.findByDescricao", Avaliacao.class).setParameter("descricao", descricao).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}
}
