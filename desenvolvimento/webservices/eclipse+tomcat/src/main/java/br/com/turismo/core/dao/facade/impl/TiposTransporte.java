package br.com.turismo.core.dao.facade.impl;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import br.com.turismo.core.dao.GenericDAO;
import br.com.turismo.core.entities.TipoTransporte;
import br.com.turismo.core.util.exceptions.NegocioException;

public class TiposTransporte extends GenericDAO<TipoTransporte, Integer> {

	@Inject
	private EntityManager manager;

	public TiposTransporte() {
		super(TipoTransporte.class);
	}

	public List<TipoTransporte> buscarPorDescricao(String descricao) {
		return manager.createNamedQuery("TipoTransporte.findByDescricao", TipoTransporte.class)
				.setParameter("descricao", descricao)
				.getResultList();
	}

	@Override
	public boolean validarDuplicidade(TipoTransporte entity) throws NegocioException {
		// TODO Auto-generated method stub
		return true;
	}

}
