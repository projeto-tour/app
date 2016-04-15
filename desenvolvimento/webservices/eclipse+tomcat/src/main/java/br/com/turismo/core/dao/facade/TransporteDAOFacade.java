package br.com.turismo.core.dao.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.dao.TransporteDAO;
import br.com.turismo.core.entities.TipoTransporte;
import br.com.turismo.core.entities.Transporte;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.negocio.messages.Mensagens;


public class TransporteDAOFacade implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private TransporteDAO transporteDAO;

	public boolean salvar(Transporte transporte) {

			Transporte transporteExistente = transporteDAO.buscarPorDescricao(transporte.getDescricao());

			if (transporteExistente != null && !transporteExistente.equals(transporteDAO)) {
				throw new NegocioException(Mensagens.getMensagem(null, "M5"));
			}

			transporteDAO.salvar(transporte);
			return true;
		
	}

	public Transporte atualizar(Transporte transporte) {
		Transporte transporteExistente = transporteDAO.buscarPorDescricao(transporte.getDescricao());

		if (transporteExistente != null && !transporteExistente.equals(transporteDAO)) {
			throw new NegocioException(Mensagens.getMensagem(null, "M5"));
		}
		
		return transporteDAO.atualizar(transporte);
	}

	public boolean remover(Long id) {
		transporteDAO.remover(id);
		return true;
	}

	public Transporte buscarPorId(Long id) {
		return transporteDAO.buscarPorId(id);
	}

	public List<Transporte> buscarTodos() {
		return transporteDAO.buscarTodos();
	}
	
	public List<Transporte> buscarPorTipoTransporte(Long idTipoTransporte) {
		return transporteDAO.buscarPorTipoTransporte(idTipoTransporte);
	}

	public Transporte buscarPorDescricao(String descricao) {
		return transporteDAO.buscarPorDescricao(descricao);
	}

}
