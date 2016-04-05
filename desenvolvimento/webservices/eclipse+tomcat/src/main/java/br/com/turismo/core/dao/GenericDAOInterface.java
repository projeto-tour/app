package br.com.turismo.core.dao;

import java.io.Serializable;
import java.util.List;

import javax.validation.Valid;

import br.com.turismo.core.util.exceptions.NegocioException;

public interface GenericDAOInterface<E extends Serializable, I> {
	
	E salvar(@Valid E entity) throws NegocioException;

	E atualizar(@Valid E entity) throws NegocioException;

	void remover(I id) throws NegocioException;

	List<E> buscarTodos();

	E buscarPorId(I id);
	
	boolean validarDuplicidade(@Valid E entity) throws NegocioException;
	
}
