package br.com.turismo.core.dao.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.dao.facade.impl.Avaliacoes;
import br.com.turismo.core.entities.Avaliacao;

public class AvaliacoesFacade implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Inject
	private Avaliacoes avaliacoes;

	public boolean salvar(Avaliacao entity) {
		avaliacoes.salvar(entity);
		return true;
	}

	public Avaliacao atualizar(Avaliacao entity) {
		return avaliacoes.atualizar(entity);
	}

	public boolean remover(Long id) {
		avaliacoes.remover(id);
		return true;
	}

	public Avaliacao buscarPorId(Long id) {
		return avaliacoes.buscarPorId(id);
	}

	public List<Avaliacao> buscarTodos() {
		return avaliacoes.buscarTodos();
	}

	public List<Avaliacao> buscarPorDescricao(String descricao) {
		return avaliacoes.buscarPorDescricao(descricao);
	}
}
