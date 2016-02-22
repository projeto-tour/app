package br.com.turismo.core.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.model.Avaliacao;
import br.com.turismo.core.repository.Avaliacoes;

public class AvaliacoesFacade implements Serializable
{
	private static final long serialVersionUID = 1L;

	@Inject
	private Avaliacoes avaliacoes;
	
	public boolean inserir(Avaliacao entity) {
		avaliacoes.inserir(entity);
		return true;
    }

    public Avaliacao alterar(Avaliacao entity) {
		return avaliacoes.alterar(entity);
    }

    public boolean remove(Long id) {
		avaliacoes.remove(id);
		return true;
    }

    public Avaliacao find(Long id) 
    {
        return avaliacoes.find(id);
    }

    public List<Avaliacao> findAll() {
		return avaliacoes.findAll();
    }
}
