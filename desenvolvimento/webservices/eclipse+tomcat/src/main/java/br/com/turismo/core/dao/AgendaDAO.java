package br.com.turismo.core.dao;

import java.util.Date;
import java.util.List;

import javax.persistence.NoResultException;

import br.com.turismo.core.entities.Agenda;

public class AgendaDAO extends GenericDAO<Agenda, Long> {
	
	public AgendaDAO() {
		super(Agenda.class);
	}
	
	public List<Agenda> buscarPorDescricao(String descricao) {
		try {
			return manager.createNamedQuery("Agenda.findByDescricao", Agenda.class).setParameter("descricao", descricao)
					.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}
	
	public List<Agenda> buscarPorDataInicio(Date dataInicio) {
		try {
			return manager.createNamedQuery("Agenda.findByDataInicio", Agenda.class).setParameter("dataInicio", dataInicio)
					.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}
	
	public List<Agenda> buscarPorDataFim(Date dataFim) {
		try {
			return manager.createNamedQuery("Agenda.findByDataFim", Agenda.class).setParameter("dataFim", dataFim)
					.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}
	
	public Agenda buscarPorDataCriacao(Date dataCriacaoAgenda) {
		try {
			return manager.createNamedQuery("Agenda.findByDataCriacaoAgenda", Agenda.class).setParameter("dataCriacaoAgenda", dataCriacaoAgenda)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	public Agenda buscarPorDescricaoUsuario(String descricao, Long idUsuario) {
		try {
			return manager.createNamedQuery("Agenda.findByDescricaoUsuario", Agenda.class).setParameter("descricao", descricao).setParameter("usuario_id", idUsuario)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	public List<Agenda> buscarPorTipoAgenda(Long id_tipo_agenda) {
		try {
			return manager.createNamedQuery("Agenda.findByTipoAgenda", Agenda.class).setParameter("id_tipo_agenda", id_tipo_agenda)
					.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}

}
