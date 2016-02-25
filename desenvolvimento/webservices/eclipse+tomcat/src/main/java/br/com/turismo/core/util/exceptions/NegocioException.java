package br.com.turismo.core.util.exceptions;

import java.io.Serializable;

public class NegocioException extends RuntimeException implements Serializable {
	
	private static final long serialVersionUID = 1L;

	public NegocioException() {
	}

	public NegocioException(String mensagem) {
		super(mensagem);
	}

	public NegocioException(Throwable excecao) {
		super(excecao);
	}

	public NegocioException(String mensagem, Throwable excecao) {
		super(mensagem, excecao);
	}
}
