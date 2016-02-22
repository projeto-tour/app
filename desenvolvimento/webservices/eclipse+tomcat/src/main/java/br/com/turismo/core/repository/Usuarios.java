package br.com.turismo.core.repository;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import br.com.turismo.core.model.Usuario;
import br.com.turismo.core.util.jpa.Transactional;

public class Usuarios implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private EntityManager manager;

	@Transactional
	public void inserir(Usuario entity) {
		manager.persist(entity);
	}

	@Transactional
	public Usuario alterar(Usuario entity) {
		return manager.merge(entity);
	}

	@Transactional
	public void remove(Long id) {
		manager.remove(find(id));
	}

	public Usuario find(Long id) {
		return manager.find(Usuario.class, id);
	}

	public List<Usuario> findAll() {
		return manager.createNamedQuery("Usuario.findAll", Usuario.class)
				.getResultList();
	}

	public Usuario pesquisarPorEmail(String email) {
		try {
			return manager
					.createNamedQuery("Usuario.findByEmail", Usuario.class)
					.setParameter("email", email).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	public Usuario pesquisarPorEmailSenha(String email, String senha) {
		try {
			return manager
					.createNamedQuery("Usuario.findByLogin", Usuario.class)
					.setParameter("email", email).setParameter("senha", senha)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

}
