package br.com.turismo.core.repository;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import br.com.turismo.core.dao.GenericDAO;
import br.com.turismo.core.model.TipoTransporte;

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
}
