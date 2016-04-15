package br.com.turismo.core.dao;

import javax.persistence.NoResultException;

import br.com.turismo.core.entities.TipoTransporte;

public class TipoTransporteDAO extends GenericDAO<TipoTransporte, Long> {
	
	public TipoTransporteDAO() {
		super(TipoTransporte.class);
	}
	
	public TipoTransporte buscarPorDescricao(String descricao) {
		try {
			return manager.createNamedQuery("TipoTransporte.findByDescricao", TipoTransporte.class).setParameter("descricao", descricao)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}
	
	
}
	