package br.com.turismo.core.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.model.TipoHospedagem;
import br.com.turismo.core.repository.TiposHospedagem;

public class TiposHospedagemFacade implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Inject
	private TiposHospedagem tiposHospedagem;

	public boolean salvar(TipoHospedagem entity) {
		tiposHospedagem.salvar(entity);
		return true;
	}

	public TipoHospedagem atualizar(TipoHospedagem entity) {
		return tiposHospedagem.atualizar(entity);
	}

	public boolean remover(Integer id) {
		tiposHospedagem.remover(id);
		return true;
	}

	public TipoHospedagem buscarPorId(Integer id) {
		return tiposHospedagem.buscarPorId(id);
	}

	public List<TipoHospedagem> buscarTodos() {
		return tiposHospedagem.buscarTodos();
	}

	public List<TipoHospedagem> buscarPorDescricao(String descricao) {
		return tiposHospedagem.buscarPorDescricao(descricao);
	}
}