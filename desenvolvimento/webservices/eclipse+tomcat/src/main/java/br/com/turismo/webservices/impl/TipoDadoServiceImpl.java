package br.com.turismo.webservices.impl;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.turismo.core.dao.facade.TipoDadoDAOFacade;
import br.com.turismo.core.entities.TipoDeDado;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.negocio.messages.Mensagens;
import br.com.turismo.webservices.TipoDadoService;
import br.com.turismo.webservices.response.ResponseRest;

public class TipoDadoServiceImpl extends ServiceAbstract implements TipoDadoService {
	@Inject
	private TipoDadoDAOFacade tipoDadoDAOFacade;

	@Override
	public Response salvarTipoDado(String token, String idioma, String descricao) {
		//Setar idioma
				setLocale(idioma);

				
				try {
					// validando token. Se ok, realiza a operacao, senao retorna erro
					if (validarToken(token)) {
						
						tipoDadoDAOFacade.salvar(new TipoDeDado(descricao));
						
						// montando retorno do servico
						this.setResponseRest(
								new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M4")));
						
					}
					
					return buildResponse(this.getResponseRest());
					
				} catch (NegocioException ne) { // se tivermos uma violacao de regra de negocio, o sistema retorna o erro
					
					this.getResponseRest().setDados("mensagem:", ne.getMessage() + " STACK: " +  ne.fillInStackTrace());
					return buildResponse(Status.UNAUTHORIZED, this.getResponseRest());
					
				} 
				catch (Exception e) { // se tivermos qualquer outro problema, o sistema retorna erro interno
					
					this.getResponseRest().setDados("mensagem", e.getMessage() + ": " + e.fillInStackTrace());
					return buildResponse(Status.INTERNAL_SERVER_ERROR, this.getResponseRest());
				}
	}

	@Override
	public Response atualizarTipoDado(String token, String idioma, Long id, String descricao) {
		//Setar idioma
				setLocale(idioma);

				
				try {
					// validando token. Se ok, realiza a operacao, senao retorna erro
					if (validarToken(token)) {
						
						tipoDadoDAOFacade.atualizar(new TipoDeDado(id,descricao));
						
						// montando retorno do servico
						this.setResponseRest(
								new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M4")));
						
					}
					
					return buildResponse(this.getResponseRest());
					
				} catch (NegocioException ne) { // se tivermos uma violacao de regra de negocio, o sistema retorna o erro
					
					this.getResponseRest().setDados("mensagem: ", ne.getMessage());
					return buildResponse(Status.UNAUTHORIZED, this.getResponseRest());
					
				} catch (Exception e) { // se tivermos qualquer outro problema, o sistema retorna erro interno
					
					this.getResponseRest().setDados("mensagem", Mensagens.getMensagem(getLocale(), "M3"));
					return buildResponse(Status.INTERNAL_SERVER_ERROR, this.getResponseRest());
				}
			}


	@Override
	public Response removerTipoDado(String token, String idioma, Long id) {
		// Setar idioma
		setLocale(idioma);

		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {

				tipoDadoDAOFacade.remover(id);

				// montando retorno do servico
				this.setResponseRest(new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M6")));

			}

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
	public Response buscarTipoDadoPorId(String token, String idioma, Long id) {
		// Setar idioma
		setLocale(idioma);

		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {

				// montando retorno do servico
				this.setResponseRest(new ResponseRest(true, "M1", tipoDadoDAOFacade.buscarPorId(id)));

			}

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
	public Response buscarTipoDadoTodos(String token, String idioma) {
		// Setar idioma
		setLocale(idioma);

		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {

				// montando retorno do servico
				this.setResponseRest(new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M1"),
						tipoDadoDAOFacade.buscarTodos()));

			}

			return buildResponse(this.getResponseRest());

		} catch (NegocioException ne) { // se tivermos uma violacao de regra de
										// negocio, o sistema retorna o erro

			this.getResponseRest().setDados("mensagem", ne.getMessage());
			return buildResponse(Status.UNAUTHORIZED, this.getResponseRest());

		} catch (Exception e) { // se tivermos qualquer outro problema, o
								// sistema retorna erro interno
			System.out.println(e);

			this.getResponseRest().setDados("mensagem", Mensagens.getMensagem(getLocale(), "M3"));
			return buildResponse(Status.INTERNAL_SERVER_ERROR, this.getResponseRest());
		}
	}

	@Override
	public Response buscarTipoDadoPorDescricao(String token, String idioma, String descricao) {

		// Setar idioma
		setLocale(idioma);

		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {

				// montando retorno do servico
				this.setResponseRest(new ResponseRest(true, "M1", tipoDadoDAOFacade.buscarPorDescricao(descricao)));

			}

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
}
