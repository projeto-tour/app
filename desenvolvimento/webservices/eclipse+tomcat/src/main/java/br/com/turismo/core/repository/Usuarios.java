package br.com.turismo.core.repository;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import br.com.turismo.core.dao.GenericDAO;
import br.com.turismo.core.model.Usuario;

public class Usuarios extends GenericDAO<Usuario, Long> {

	@Inject
	private EntityManager manager;

	public Usuarios() {
		super(Usuario.class);
	}

	public Usuario buscarPorEmail(String email) {
		try {
			return manager.createNamedQuery("Usuario.findByEmail", Usuario.class)
					.setParameter("email", email)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	public Usuario buscarPorEmailSenha(String email, String senha) {
		try {
			return manager.createNamedQuery("Usuario.findByEmailSenha", Usuario.class)
					.setParameter("email", email)
					.setParameter("senha", senha).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	public Usuario buscarPorNome(String nome) {
		try {
			return manager.createNamedQuery("Usuario.findByNome", Usuario.class)
					.setParameter("nome", nome)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

}
