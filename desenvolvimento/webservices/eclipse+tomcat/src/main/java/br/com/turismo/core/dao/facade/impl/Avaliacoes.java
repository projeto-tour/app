package br.com.turismo.core.dao.facade.impl;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import br.com.turismo.core.dao.GenericDAO;
import br.com.turismo.core.entities.Avaliacao;
import br.com.turismo.core.util.exceptions.NegocioException;

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

	@Override
	public boolean validarDuplicidade(Avaliacao entity) throws NegocioException {
		// TODO Auto-generated method stub
		return true;
	}

}
