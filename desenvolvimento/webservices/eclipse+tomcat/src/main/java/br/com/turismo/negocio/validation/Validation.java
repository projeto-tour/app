package br.com.turismo.negocio.validation;

public abstract class Validation<E> {

	private Class<E> entityClass;
	
	protected Validation(Class<E> entityClass){
		this.entityClass = entityClass;
	}
	
}
