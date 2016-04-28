package br.com.turismo.core.dao;

import javax.persistence.NoResultException;

import br.com.turismo.core.entities.Caracteristica;

public class CaracteristicaDAO extends GenericDAO<Caracteristica, Long> {

	public CaracteristicaDAO() {
		super(Caracteristica.class);
	}

	public Caracteristica buscarPorId(Long id) {
		try {
			return manager.createNamedQuery("Caracteristica.findById", Caracteristica.class).setParameter("id", id)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	public Caracteristica buscarPorDescricao(String descricao) {
		try {
			return manager.createNamedQuery("Caracteristica.findByDescricao", Caracteristica.class)
					.setParameter("descricao", descricao).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}
}
