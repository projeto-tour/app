package br.com.turismo.core.dao.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.dao.TipoAgendaDAO;
import br.com.turismo.core.entities.TipoAgenda;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.negocio.messages.Mensagens;

public class TipoAgendaDAOFacade implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private TipoAgendaDAO tipoAgendaDAO;

	public boolean salvar(TipoAgenda tipoAgenda) {
		
		TipoAgenda tipoAgendaExistente = tipoAgendaDAO.buscarPorDescricao(tipoAgenda.getDescricao());

		if (tipoAgendaExistente != null && !tipoAgendaExistente.equals(tipoAgendaDAO)) {
			throw new NegocioException(Mensagens.getMensagem(null, "M5"));
		}

		tipoAgendaDAO.salvar(tipoAgenda);
		return true;
	}

	public TipoAgenda atualizar(TipoAgenda tipoAgenda) {
		
		TipoAgenda tipoAgendaExistente = tipoAgendaDAO.buscarPorDescricao(tipoAgenda.getDescricao());

		if (tipoAgendaExistente != null && !tipoAgendaExistente.equals(tipoAgendaDAO)) {
			throw new NegocioException(Mensagens.getMensagem(null, "M5"));
		}
		
		return tipoAgendaDAO.atualizar(tipoAgenda);
	}

	public boolean remover(Long id) {
		tipoAgendaDAO.remover(id);
		return true;
	}

	public TipoAgenda buscarPorId(Long id) {
		return tipoAgendaDAO.buscarPorId(id);
	}

	public List<TipoAgenda> buscarTodos() {
		return tipoAgendaDAO.buscarTodos();
	}

	public TipoAgenda buscarPorDescricao(String descricao) {
		return tipoAgendaDAO.buscarPorDescricao(descricao);
	}

}
