package br.com.turismo.core.dao;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.validation.Valid;

import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.core.util.jpa.Transactional;

public abstract class GenericDAO<E extends Serializable, I> implements GenericDAOInterface<E, I> {
	
	@Inject
	protected EntityManager manager;

	private Class<E> entityClass;

	protected GenericDAO() {
	}

	protected GenericDAO(Class<E> entityClass) {
		this();
		this.entityClass = entityClass;
	}

	@Override
	@Transactional
	public E salvar(@Valid E entity) throws NegocioException {
		try {
			manager.persist(entity);
			return entity;
		} catch (PersistenceException erro) {
			erro.printStackTrace();
			throw new NegocioException(entityClass.getClass().getName(), erro);
		}
	}

	@Override
	@Transactional
	public E atualizar(@Valid E entity) throws NegocioException {
		try {
			manager.merge(entity);
			return entity;
		} catch (PersistenceException erro) {
			erro.printStackTrace();
			throw new NegocioException(entityClass.getClass().getName(), erro);
		}
	}

	@Override
	@Transactional
	public void remover(I id) throws NegocioException {
		try {
			E entity = buscarPorId(id);
			E mergedEntity = manager.merge(entity);
			manager.remove(mergedEntity);
			manager.flush();
		} catch (PersistenceException erro) {
			erro.printStackTrace();
			throw new NegocioException(entityClass.getClass().getName(), erro);
		}
	}

	@Override
	public E buscarPorId(I id) {
		try {
			return manager.find(entityClass, id);
		} catch (NoResultException erro) {
			return null;
		}
	}
	
	@Override
	public List<E> buscarTodos() {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<E> query = builder.createQuery(entityClass);
		query.from(entityClass);
		return manager.createQuery(query).getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean validarDuplicidade(@Valid E entity) throws NegocioException {
		
		boolean valido = false;
		
		List<E> entities = (List<E>) manager.createNamedQuery(entity.getClass().getSimpleName() + ".isDuplicate");
		
		
		return valido;
	}
}
