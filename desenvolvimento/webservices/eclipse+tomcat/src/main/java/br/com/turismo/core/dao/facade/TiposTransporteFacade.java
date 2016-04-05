package br.com.turismo.core.dao.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.dao.facade.impl.TiposTransporte;
import br.com.turismo.core.entities.TipoTransporte;

public class TiposTransporteFacade implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private TiposTransporte tiposTransporte;

	public boolean salvar(TipoTransporte entity) {
		tiposTransporte.salvar(entity);
		return true;
	}

	public TipoTransporte atualizar(TipoTransporte entity) {
		return tiposTransporte.atualizar(entity);
	}

	public boolean remover(Integer id) {
		tiposTransporte.remover(id);
		return true;
	}

	public TipoTransporte buscarPorId(Integer id) {
		return tiposTransporte.buscarPorId(id);
	}

	public List<TipoTransporte> buscarTodos() {
		return tiposTransporte.buscarTodos();
	}

	public List<TipoTransporte> buscarPorDescricao(String descricao) {
		return tiposTransporte.buscarPorDescricao(descricao);
	}
}
