package br.com.turismo.core.dao.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.dao.TipoTransporteDAO;
import br.com.turismo.core.entities.TipoTransporte;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.negocio.messages.Mensagens;

public class TipoTransporteDAOFacade implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private TipoTransporteDAO tipoTransporteDAO;

	public boolean salvar(TipoTransporte tipoTransporte) {
		
		TipoTransporte tipoTransporteExistente = tipoTransporteDAO.buscarPorDescricao(tipoTransporte.getDescricao());

		if (tipoTransporteExistente != null && !tipoTransporteExistente.equals(tipoTransporteDAO)) {
			throw new NegocioException(Mensagens.getMensagem(null, "M5"));
		}

		tipoTransporteDAO.salvar(tipoTransporte);
		return true;
	}

	public TipoTransporte atualizar(TipoTransporte tipoTransporte) {
		
		TipoTransporte tipoTransporteExistente = tipoTransporteDAO.buscarPorDescricao(tipoTransporte.getDescricao());

		if (tipoTransporteExistente != null && !tipoTransporteExistente.equals(tipoTransporteDAO)) {
			throw new NegocioException(Mensagens.getMensagem(null, "M5"));
		}
		
		return tipoTransporteDAO.atualizar(tipoTransporte);
	}

	public boolean remover(Long id) {
		tipoTransporteDAO.remover(id);
		return true;
	}

	public TipoTransporte buscarPorId(Long id) {
		return tipoTransporteDAO.buscarPorId(id);
	}

	public List<TipoTransporte> buscarTodos() {
		return tipoTransporteDAO.buscarTodos();
	}

	public TipoTransporte buscarPorDescricao(String descricao) {
		return tipoTransporteDAO.buscarPorDescricao(descricao);
	}

}
