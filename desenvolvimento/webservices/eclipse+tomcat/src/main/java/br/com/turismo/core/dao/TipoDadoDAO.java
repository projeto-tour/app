package br.com.turismo.core.dao;

import javax.persistence.NoResultException;

import br.com.turismo.core.entities.TipoDeDado;

public class TipoDadoDAO extends GenericDAO<TipoDeDado, Long> {
	public TipoDadoDAO() {
		super(TipoDeDado.class);
	}

	public TipoDeDado buscarPorDescricao(String descricao) {
		try {
			return manager.createNamedQuery("TipoDado.findByDescricao", TipoDeDado.class)
					.setParameter("descricao", descricao).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

}
