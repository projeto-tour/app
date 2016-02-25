package br.com.turismo.core.repository;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import br.com.turismo.core.dao.GenericDAO;
import br.com.turismo.core.model.TipoHospedagem;

public class TiposHospedagem extends GenericDAO<TipoHospedagem, Integer> {

	@Inject
	private EntityManager manager;

	public TiposHospedagem() {
		super(TipoHospedagem.class);
	}

	public List<TipoHospedagem> buscarPorDescricao(String descricao) {
		return manager.createNamedQuery("TipoHospedagem.findByDescricao", TipoHospedagem.class)
				.setParameter("descricao", descricao)
				.getResultList();
	}
}
