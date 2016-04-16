package br.com.turismo.core.dao.facade;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.dao.AgendaDAO;
import br.com.turismo.core.entities.Agenda;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.negocio.messages.Mensagens;

public class AgendaDAOFacade implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private AgendaDAO agendaDAO;

	public boolean salvar(Agenda agenda) {

			Agenda agendaExistente = agendaDAO.buscarPorDescricaoUsuario(agenda.getDescricao(), agenda.getUsuario().getId());

			if (agendaExistente != null && !agendaExistente.equals(agendaDAO)) {
				throw new NegocioException(Mensagens.getMensagem(null, "M5"));
			}

			agendaDAO.salvar(agenda);
			return true;
		
	}

	public Agenda atualizar(Agenda agenda) {
		Agenda agendaExistente = agendaDAO.buscarPorDescricaoUsuario(agenda.getDescricao(), agenda.getUsuario().getId());

		if (agendaExistente != null && !agendaExistente.equals(agendaDAO)) {
			throw new NegocioException(Mensagens.getMensagem(null, "M5"));
		}
		
		return agendaDAO.atualizar(agenda);
	}

	public boolean remover(Long id) {
		agendaDAO.remover(id);
		return true;
	}

	public Agenda buscarPorId(Long id) {
		return agendaDAO.buscarPorId(id);
	}

	public List<Agenda> buscarTodos() {
		return agendaDAO.buscarTodos();
	}
	
	public List<Agenda> buscarPorTipoAgenda(Long idTipoAgenda) {
		return agendaDAO.buscarPorTipoAgenda(idTipoAgenda);
	}

	public List<Agenda> buscarPorDescricao(String descricao) {
		return agendaDAO.buscarPorDescricao(descricao);
	}

	public Agenda buscarPorDescricaoUsuario(String descricao, Long idUsuario) {
		return agendaDAO.buscarPorDescricaoUsuario(descricao, idUsuario);
	}

	public List<Agenda> buscarPorDataInicio(Date dateDataInicio) {
		return agendaDAO.buscarPorDataInicio(dateDataInicio);
	}
	
	public List<Agenda> buscarPorDataFim(Date dateDataFim) {
		return agendaDAO.buscarPorDataFim(dateDataFim);
	}
	
	public Agenda buscarPorDataCriacao(Date dateDataCriacao) {
		return agendaDAO.buscarPorDataCriacao(dateDataCriacao);
	}

}
