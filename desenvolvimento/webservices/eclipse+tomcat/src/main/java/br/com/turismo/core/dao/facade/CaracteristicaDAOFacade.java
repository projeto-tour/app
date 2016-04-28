package br.com.turismo.core.dao.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.dao.CaracteristicaDAO;
import br.com.turismo.core.entities.Caracteristica;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.negocio.messages.Mensagens;

public class CaracteristicaDAOFacade implements Serializable {

	private static final long serialVersionUID = -1630159212395762297L;
	@Inject
	private CaracteristicaDAO caracteristicaDAO;

	public boolean salvar(Caracteristica caracteristica) {

		Caracteristica caracteristicaExistente = caracteristicaDAO.buscarPorDescricao(caracteristica.getDescricao());

		if (caracteristicaExistente != null && !caracteristicaExistente.equals(caracteristicaDAO)) {
			throw new NegocioException(Mensagens.getMensagem(null, "M5"));
		}

		caracteristicaDAO.salvar(caracteristica);
		return true;
	}

	public Caracteristica atualizar(Caracteristica caracteristica) {

		Caracteristica caracteristicaExistente = caracteristicaDAO.buscarPorDescricao(caracteristica.getDescricao());

		if (caracteristicaExistente != null && !caracteristicaExistente.equals(caracteristicaDAO)) {
			throw new NegocioException(Mensagens.getMensagem(null, "M5"));
		}

		return caracteristicaDAO.atualizar(caracteristica);
	}

	public boolean remover(Long id) {
		caracteristicaDAO.remover(id);
		return true;
	}

	public Caracteristica buscarPorId(Long id) {
		return caracteristicaDAO.buscarPorId(id);
	}

	public List<Caracteristica> buscarTodos() {
		return caracteristicaDAO.buscarTodos();
	}

	public Caracteristica buscarPorDescricao(String descricao) {
		return caracteristicaDAO.buscarPorDescricao(descricao);
	}

}
