package br.com.turismo.core.dao;

import java.util.List;

import javax.persistence.NoResultException;

import br.com.turismo.core.entities.Transporte;

public class TransporteDAO extends GenericDAO <Transporte, Long> {
	
	public TransporteDAO() {
		super(Transporte.class);
	}
	
	public List<Transporte> buscarPorTipoTransporte (Long idTipoTransporte) {
		try {
			return manager.createNamedQuery("Transporte.findByTipoTransporte", Transporte.class).setParameter("idTipoTransporte", idTipoTransporte)
					.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}
	
	public Transporte buscarPorDescricao(String descricao) {
		try {
			return manager.createNamedQuery("Transporte.findByDescricao", Transporte.class).setParameter("descricao", descricao)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}
}
