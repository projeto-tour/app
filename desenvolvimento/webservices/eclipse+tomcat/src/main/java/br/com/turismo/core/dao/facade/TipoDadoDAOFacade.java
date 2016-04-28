package br.com.turismo.core.dao.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.dao.TipoDadoDAO;
import br.com.turismo.core.entities.TipoDeDado;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.negocio.messages.Mensagens;

public class TipoDadoDAOFacade implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private TipoDadoDAO tipoDadoDAO;

	public boolean salvar(TipoDeDado tipodado) {

		TipoDeDado tipoDadoExistente = tipoDadoDAO.buscarPorDescricao(tipodado.getDescricao());

		if (tipoDadoExistente != null && !tipoDadoExistente.equals(tipoDadoDAO)) {
			throw new NegocioException(Mensagens.getMensagem(null, "M5"));
		}

		tipoDadoDAO.salvar(tipodado);
		return true;
	}

	public TipoDeDado atualizar(TipoDeDado tipodado) {

		TipoDeDado tipoDadoExistente = tipoDadoDAO.buscarPorDescricao(tipodado.getDescricao());

		if (tipoDadoExistente != null && !tipoDadoExistente.equals(tipoDadoDAO)) {
			throw new NegocioException(Mensagens.getMensagem(null, "M5"));
		}

		return tipoDadoDAO.atualizar(tipodado);
	}

	public boolean remover(Long id) {
		tipoDadoDAO.remover(id);
		return true;
	}

	public List<TipoDeDado> buscarTodos() {
		return tipoDadoDAO.buscarTodos();
	}

	public TipoDeDado buscarPorDescricao(String descricao) {
		return tipoDadoDAO.buscarPorDescricao(descricao);
	}

	public TipoDeDado buscarPorId(Long id) {
		return tipoDadoDAO.buscarPorId(id);
	}

}
