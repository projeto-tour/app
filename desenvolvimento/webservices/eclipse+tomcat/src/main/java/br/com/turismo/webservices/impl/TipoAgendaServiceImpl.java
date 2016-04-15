package br.com.turismo.webservices.impl;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.turismo.core.dao.facade.TipoAgendaDAOFacade;
import br.com.turismo.core.entities.TipoAgenda;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.negocio.messages.Mensagens;
import br.com.turismo.webservices.TipoAgendaService;
import br.com.turismo.webservices.response.ResponseRest;

public class TipoAgendaServiceImpl extends ServiceAbstract implements TipoAgendaService {
	
	@Inject
	private TipoAgendaDAOFacade tipoAgendaDAOFacade;

	@Override
	public Response salvarTipoAgenda(String token, String idioma, String descricao) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				tipoAgendaDAOFacade.salvar(new TipoAgenda(descricao));
				
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
	public Response atualizarTipoAgenda(String token, String idioma, Long id, String descricao) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				tipoAgendaDAOFacade.atualizar(new TipoAgenda(id,descricao));
				
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
	public Response removerTipoAgenda(String token, String idioma, Long id) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				tipoAgendaDAOFacade.remover(id);
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M6")));
				
			}
			
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
	public Response buscarTipoAgendaPorId(String token, String idioma, Long id) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", tipoAgendaDAOFacade.buscarPorId(id)));
				
			}
			
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
	public Response buscarTipoAgendaTodos(String token, String idioma) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M1"), tipoAgendaDAOFacade.buscarTodos()));
				
			}
			
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
	public Response buscarTipoAgendaPorDescricao(String token, String idioma, String descricao) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", tipoAgendaDAOFacade.buscarPorDescricao(descricao)));
				
			}
			
			return buildResponse(this.getResponseRest());
			
		} catch (NegocioException ne) { // se tivermos uma violacao de regra de negocio, o sistema retorna o erro
			
			this.getResponseRest().setDados("mensagem", ne.getMessage());
			return buildResponse(Status.UNAUTHORIZED, this.getResponseRest());
			
		} catch (Exception e) { // se tivermos qualquer outro problema, o sistema retorna erro interno
			
			this.getResponseRest().setDados("mensagem", Mensagens.getMensagem(getLocale(), "M3"));
			return buildResponse(Status.INTERNAL_SERVER_ERROR, this.getResponseRest());
		}
	}

}