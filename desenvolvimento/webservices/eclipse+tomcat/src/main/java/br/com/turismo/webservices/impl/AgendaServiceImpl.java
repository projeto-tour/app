package br.com.turismo.webservices.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.turismo.core.dao.facade.AgendaDAOFacade;
import br.com.turismo.core.dao.facade.TipoAgendaDAOFacade;
import br.com.turismo.core.dao.facade.UsuariosDAOFacade;
import br.com.turismo.core.entities.Agenda;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.negocio.messages.Mensagens;
import br.com.turismo.webservices.AgendaService;
import br.com.turismo.webservices.response.ResponseRest;

public class AgendaServiceImpl extends ServiceAbstract implements AgendaService {
	
	@Inject
	private AgendaDAOFacade agendaDAOFacade;
	
	@Inject
	private TipoAgendaDAOFacade tipoAgendaDAOFacade;
	
	@Inject
	private UsuariosDAOFacade usuarioDAOFacade;
	
	private DateFormat formatter = new SimpleDateFormat("yyyyMMdd");
	private Date dateDataInicio ;
	private Date dateDataFim ;
	private Date dataCriacao;

	@Override
	public Response salvarAgenda(String token, String idioma, Long idTipoAgenda, String descricao, String datainicio, String datafim, Long idUsuario) {
		
		//Setar idioma
		setLocale(idioma);
		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {

				dateDataInicio= (Date)formatter.parse(datainicio);
				dateDataFim= (Date)formatter.parse(datafim);
				dataCriacao = new Date();
				agendaDAOFacade.salvar(new Agenda(descricao, dateDataInicio, dateDataFim, dataCriacao, tipoAgendaDAOFacade.buscarPorId(idTipoAgenda),usuarioDAOFacade.buscarPorId(idUsuario) ));

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
	public Response atualizarAgenda(String token, String idioma, Long id, Long idusuario, Long idtipoagenda, String descricao, String datainicio, String datafim) {
		
		//Setar idioma
		setLocale(idioma);


		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				dateDataInicio= (Date)formatter.parse(datainicio);
				dateDataFim= (Date)formatter.parse(datafim);
				
				agendaDAOFacade.atualizar(new Agenda(id, descricao, dateDataInicio, dateDataFim,agendaDAOFacade.buscarPorId(id).getDataCriacaoAgenda() ,tipoAgendaDAOFacade.buscarPorId(idtipoagenda), usuarioDAOFacade.buscarPorId(idusuario)));
				
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
	public Response removerAgenda(String token, String idioma, Long id) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				agendaDAOFacade.remover(id);
				
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
	public Response buscarAgendaPorId(String token, String idioma, Long id) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", agendaDAOFacade.buscarPorId(id)));
				
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
	public Response buscarAgendaTodos(String token, String idioma) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", agendaDAOFacade.buscarTodos()));
				
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
	public Response buscaAgendaPorDescricao(String token, String idioma, String descricao) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", agendaDAOFacade.buscarPorDescricao(descricao)));
				
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
	public Response buscarAgendaPorTipoAgenda(String token, String idioma, Long idtipoagenda) {
		
		//Setar idioma
		setLocale(idioma);

		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", agendaDAOFacade.buscarPorTipoAgenda(idtipoagenda)));
				
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
	public Response buscaAgendaPorDescricaoUsuario(String token, String idioma, String descricao, Long idusuario) {
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", agendaDAOFacade.buscarPorDescricaoUsuario(descricao, idusuario)));
				
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
	public Response buscaAgendaPorDataInicio(String token, String idioma, String datainicio) {
		
		//Setar idioma
		setLocale(idioma);

		
		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				dateDataInicio= (Date)formatter.parse(datainicio);
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", agendaDAOFacade.buscarPorDataInicio(dateDataInicio)));
				
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
	public Response buscaAgendaPorDataFim(String token, String idioma, String datafim) {
		
		//Setar idioma
		setLocale(idioma);

		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				dateDataFim= (Date)formatter.parse(datafim);
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", agendaDAOFacade.buscarPorDataFim(dateDataFim)));
				
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
	public Response buscaAgendaPorDataCriacao(String token, String idioma, String datacriacao) {
		//Setar idioma
		setLocale(idioma);

		
		
		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				formatter = new SimpleDateFormat("yyyyMMdd_HHmmss");
				dataCriacao= (Date)formatter.parse(datacriacao);
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, "M1", agendaDAOFacade.buscarPorDataCriacao(dataCriacao)));
				
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