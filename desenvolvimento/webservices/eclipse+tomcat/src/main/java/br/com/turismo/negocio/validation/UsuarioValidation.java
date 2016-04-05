package br.com.turismo.negocio.validation;

import br.com.turismo.core.entities.Usuario;

public class UsuarioValidation extends Validation<Usuario> {

	// Pattern de validação para email
	private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
	
	protected UsuarioValidation(Class<Usuario> entityClass) {
		super(entityClass);
	}

	/**
	 * Método que realiza a validação de email
	 * 
	 * @param email
	 * @return Retorno booleano. Se true, email válido. Se false, email inválido
	 */
	public static boolean validarEmail(String email) {

		return (email == null || email.isEmpty()) ? false : email.matches(UsuarioValidation.EMAIL_PATTERN);

	}

	public boolean validarDuplicidade() {
		return false;
	}

}
