package br.com.turismo.core.dao.facade;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;

import br.com.turismo.core.dao.AvaliacaoDAO;
import br.com.turismo.core.entities.Avaliacao;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.negocio.messages.Mensagens;

public class AvaliacaoDAOFacade implements Serializable {

	private static final long serialVersionUID = 3276034295327273266L;

	@Inject
	private AvaliacaoDAO avaliacaoDAO;

	public boolean salvar(Avaliacao avaliacao) {

		Avaliacao avaliacaoExistente = avaliacaoDAO.buscarPorDescricao(avaliacao.getDescricao());

		if (avaliacaoExistente != null && !avaliacaoExistente.equals(avaliacaoDAO)) {
			throw new NegocioException(Mensagens.getMensagem(null, "M5"));
		}

		avaliacaoDAO.salvar(avaliacao);
		return true;
	}

	public Avaliacao atualizar(Avaliacao avaliacao) {

		Avaliacao avaliacaoExistente = avaliacaoDAO.buscarPorDescricao(avaliacao.getDescricao());

		if (avaliacaoExistente != null && !avaliacaoExistente.equals(avaliacaoDAO)) {
			throw new NegocioException(Mensagens.getMensagem(null, "M5"));
		}

		return avaliacaoDAO.atualizar(avaliacao);
	}

	public boolean remover(Long id) {
		avaliacaoDAO.remover(id);
		return true;
	}

	public Avaliacao buscarPorId(Long id) {
		return avaliacaoDAO.buscarPorId(id);
	}

	public List<Avaliacao> buscarTodos() {
		return avaliacaoDAO.buscarTodos();
	}

	public Avaliacao buscarPorDescricao(String descricao) {
		return avaliacaoDAO.buscarPorDescricao(descricao);
	}

}
