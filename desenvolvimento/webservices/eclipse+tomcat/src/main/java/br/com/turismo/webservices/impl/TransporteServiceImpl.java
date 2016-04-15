package br.com.turismo.webservices.impl;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.turismo.core.dao.facade.TransporteDAOFacade;
import br.com.turismo.core.entities.Transporte;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.negocio.messages.Mensagens;
import br.com.turismo.webservices.TransporteService;
import br.com.turismo.webservices.response.ResponseRest;

public class TransporteServiceImpl extends ServiceAbstract implements TransporteService {
	
	@Inject
	private TransporteDAOFacade transporteDAOFacade;

	@Override
	public Response salvarTransporte(String token, String idioma, Long idTipoTransporte, String descricao) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				transporteDAOFacade.salvar(new Transporte(idTipoTransporte,descricao));
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M4")));
				
			}
			
			return buildResponse(this.getResponseRest());
			
		} catch (NegocioException ne) { // se tivermos uma violacao de regra de negocio, o sistema retorna o erro
			
			this.getResponseRest().setDados("mensagem", ne.getMessage());
			return buildResponse(Status.UNAUTHORIZED, this.getResponseRest());
			
		} catch (Exception e) { // se tivermos qualquer outro problema, o sistema retorna erro interno
			
			this.getResponseRest().setDados("mensagem", e.getMessage());
			return buildResponse(Status.INTERNAL_SERVER_ERROR, this.getResponseRest());
		}
	}

	@Override
	public Response atualizarTransporte(String token, String idioma, Long id, Long idTipoTransporte, String descricao) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				transporteDAOFacade.atualizar(new Transporte(id,idTipoTransporte,descricao));
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M4")));
				
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
	public Response removerTransporte(String token, String idioma, Long id) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				transporteDAOFacade.remover(id);
				
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
	public Response buscarTransportePorId(String token, String idioma, Long id) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", transporteDAOFacade.buscarPorId(id)));
				
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
	public Response buscarTransporteTodos(String token, String idioma) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", transporteDAOFacade.buscarTodos()));
				
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
	public Response buscaTransportePorDescricao(String token, String idioma, String descricao) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", transporteDAOFacade.buscarPorDescricao(descricao)));
				
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
	public Response buscarTransportePorTipoTransporte(String token, String idioma, Long idtipotransporte) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", transporteDAOFacade.buscarPorTipoTransporte(idtipotransporte)));
				
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
