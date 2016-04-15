package br.com.turismo.core.dao;

import javax.persistence.NoResultException;

import br.com.turismo.core.entities.TipoAgenda;

public class TipoAgendaDAO extends GenericDAO<TipoAgenda, Long> {
	
	public TipoAgendaDAO() {
		super(TipoAgenda.class);
	}
	
	public TipoAgenda buscarPorDescricao(String descricao) {
		try {
			return manager.createNamedQuery("TipoAgenda.findByDescricao", TipoAgenda.class).setParameter("descricao", descricao)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}
	
	
}
	