package br.com.turismo.webservices.impl;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.turismo.core.dao.facade.AvaliacaoDAOFacade;
import br.com.turismo.core.entities.Avaliacao;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.core.util.geral.JsonUtils;
import br.com.turismo.negocio.messages.Mensagens;
import br.com.turismo.webservices.AvaliacaoService;
import br.com.turismo.webservices.response.ResponseRest;
 
public class AvaliacaoServiceImpl extends ServiceAbstract implements AvaliacaoService {

	@Inject
	private AvaliacaoDAOFacade avaliacaoDAOFacade;

	@Override
	public Response salvarAvaliacao(String token,String idioma, String descricao) {

		// definindo idioma da request
		setLocale(idioma);

		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {

				avaliacaoDAOFacade.salvar(new Avaliacao(descricao));

				// montando retorno do servico
				this.setResponseRest(new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M4")));

			}

			// retornando os dados da requisicao
			return buildResponse(this.getResponseRest());

		} catch (NegocioException ne) { // se tivermos uma violacao de regra de
										// negocio, o sistema retorna o erro

			this.getResponseRest().setDados("mensagem", ne.getMessage());
			return buildResponse(Status.UNAUTHORIZED, this.getResponseRest());

		} catch (Exception e) { // se tivermos qualquer outro problema, o
								// sistema retorna erro interno

			this.getResponseRest().setDados("mensagem", Mensagens.getMensagem(getLocale(), "M3"));
			return buildResponse(Status.INTERNAL_SERVER_ERROR, this.getResponseRest());
		}
	}
	
	@Override 
	public Response atualizarAvaliacao(String token, String idioma, Long id, String descricao) {
		
		// definindo idioma da request
		setLocale(idioma);
		
		try {
			
			if (validarToken(token)){
				
				Avaliacao avaliacao = avaliacaoDAOFacade.atualizar(new Avaliacao(id, descricao));
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M4"), avaliacao));
			}
			
			// retornando resposta do servico
			return buildResponse(getResponseRest());
			
		} 
		catch (NegocioException ne){
			this.getResponseRest().setDados("mensagem", ne.getMessage());
			return buildResponse(Status.UNAUTHORIZED, this.getResponseRest());
		}
		catch (Exception e) {
			this.getResponseRest().setDados("mensagem", e.getMessage());
			return buildResponse(Status.INTERNAL_SERVER_ERROR, this.getResponseRest());
		}
	}

	@Override
	public Response removerAvaliacao(String token, String idioma, Long id) {
		try {
			return buildResponse(avaliacaoDAOFacade.remover(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	@Override
	public Response buscarAvaliacaoPorId(String token, String idioma, Long id) {
		try {
			return buildResponse(avaliacaoDAOFacade.buscarPorId(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	@Override
	public Response buscarAvaliacaoTodas(String token, String idioma) {

		// definindo idioma da request
		setLocale(idioma);

		try {

			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {

				// realizando a consulta
				List<Avaliacao> avaliacoes = avaliacaoDAOFacade.buscarTodos();

				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M1"), avaliacoes));
			}

			// retornando os dados da requisicao
			return buildResponse(this.getResponseRest());
			
		} catch (NegocioException ne) { // se tivermos uma violacao de regra de negocio, o sistema retorna o erro
			
			this.getResponseRest().setDados("mensagem", ne.getMessage());
			return buildResponse(Status.UNAUTHORIZED, this.getResponseRest());
			
		} catch (Exception e) { // se tivermos qualquer outro problema, o sistema retorna erro interno
			
			this.getResponseRest().setDados("mensagem", Mensagens.getMensagem(getLocale(), "M3"));
			return buildResponse(Status.INTERNAL_SERVER_ERROR, this.getResponseRest());
		}
	}

	@Override
	public Response buscarAvaliacaoPorDescricao(String token, String idioma, String descricao) {
		try {
			return buildResponse(avaliacaoDAOFacade.buscarPorDescricao(descricao));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

}
