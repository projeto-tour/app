package br.com.turismo.core.dao;

import javax.persistence.NoResultException;

import br.com.turismo.core.entities.Usuario;

public class UsuarioDAO extends GenericDAO<Usuario, Long> {

	public UsuarioDAO() {
		super(Usuario.class);
	}

	public Usuario buscarPorEmail(String email) {
		try {
			return manager.createNamedQuery("Usuario.findByEmail", Usuario.class).setParameter("email", email)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	public Usuario buscarPorEmailSenha(String email, String senha) {
		try {
			return manager.createNamedQuery("Usuario.findByEmailSenha", Usuario.class).setParameter("email", email)
					.setParameter("senha", senha).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	public Usuario buscarPorNome(String nome) {
		try {
			return manager.createNamedQuery("Usuario.findByNome", Usuario.class).setParameter("nome", nome)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

//	@SuppressWarnings("unchecked")
//	@Override
//	public boolean validarDuplicidade(Usuario usuario) throws NegocioException {
//
//		boolean valido = false;
//		
//		try {
//			List<Usuario> usuarios = (List<Usuario>) manager.createNamedQuery("Usuario.isDuplicate")
//					.setParameter("email", usuario.getEmail()).setParameter("alias", usuario.getAlias());
//			
//			valido = (usuarios.size() == 0);
//			
//			if (!valido){
//				throw new NegocioException(Mensagens.getMensagem(, "M5"));
//			}
//		} 
//		catch (Exception e) {
//			
//		}
//		
//		return valido;
//	}

}
