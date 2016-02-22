package br.com.turismo.core.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.model.Usuario;
import br.com.turismo.core.repository.Usuarios;
import br.com.turismo.core.util.jpa.Transactional;

public class UsuariosFacade implements Serializable
{
	private static final long serialVersionUID = 1L;

	@Inject
	private Usuarios usuarios;
	
	public boolean inserir(Usuario entity) {
		usuarios.inserir(entity);
		return true;
    }

	@Transactional
    public Usuario alterar(Usuario entity) {
		return usuarios.alterar(entity);
    }

	@Transactional
    public boolean remove(Long id) {
		usuarios.remove(id);
		return true;
    }

    public Usuario find(Long id) 
    {
        return usuarios.find(id);
    }

    public List<Usuario> findAll() {
		return usuarios.findAll();
    }
    
}
