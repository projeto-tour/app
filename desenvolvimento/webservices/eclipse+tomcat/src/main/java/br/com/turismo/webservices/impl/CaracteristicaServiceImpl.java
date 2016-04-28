package br.com.turismo.webservices.impl;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.turismo.core.dao.facade.CaracteristicaDAOFacade;
import br.com.turismo.core.dao.facade.TipoDadoDAOFacade;
import br.com.turismo.core.entities.Caracteristica;
import br.com.turismo.core.entities.TipoDeDado;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.core.util.geral.JsonUtils;
import br.com.turismo.negocio.messages.Mensagens;
import br.com.turismo.webservices.CaracteristicaService;
import br.com.turismo.webservices.response.ResponseRest;

public class CaracteristicaServiceImpl extends ServiceAbstract implements CaracteristicaService {

	@Inject
	private CaracteristicaDAOFacade caracteristicaDAOFacade;
	@Inject
	private TipoDadoDAOFacade tipoDadoDAOFacade;
	
	@Override
	public Response salvarCaracteristica(String token, String idioma, String descricao, Long tipoDeDado) {
		// definindo idioma da request
		setLocale(idioma);

		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {

				Caracteristica caracteristica = new Caracteristica();

				caracteristica.setDescricao(descricao);

				//TipoDadoDAOFacade tipoDeDadosFacade = new TipoDadoDAOFacade();
				
				
				TipoDeDado tipoDeDados = tipoDadoDAOFacade.buscarPorId(tipoDeDado);
				
				
				

				caracteristica.setDescricao(descricao);
				caracteristica.setTipoDeDados(tipoDeDados);

				caracteristicaDAOFacade.salvar(caracteristica);

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
			e.printStackTrace();
			return buildResponse(Status.INTERNAL_SERVER_ERROR, this.getResponseRest());
		}
	}

	@Override
	public Response atualizarCaracteristica(String token, String idioma, Long id, String descricao,
			Long tipoDeDado) {
		
		// definindo idioma da request
		setLocale(idioma);
		
		try {
			
			if (validarToken(token)){
				
				
				Caracteristica caracteristica = new Caracteristica();

				caracteristica.setDescricao(descricao);

				TipoDadoDAOFacade tipoDeDadosFacade = new TipoDadoDAOFacade();
				TipoDeDado tipoDeDados = tipoDeDadosFacade.buscarPorId(tipoDeDado);

				caracteristica.setId(tipoDeDado);
				caracteristica.setDescricao(descricao);
				caracteristica.setTipoDeDados(tipoDeDados);
				
				
				caracteristicaDAOFacade.atualizar(caracteristica);
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M4"), caracteristica));
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
	public Response removerCaracteristica(String token, String idioma, Long id) {
		try {
			return buildResponse(caracteristicaDAOFacade.remover(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	@Override
	public Response buscarCaracteristicaPorId(String token, String idioma, Long id) {
		try {
			return buildResponse(caracteristicaDAOFacade.buscarPorId(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	@Override
	public Response buscarCaracteristicaTodas(String token, String idioma) {

		// definindo idioma da request
		setLocale(idioma);

		try {

			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {

				// realizando a consulta
				List<Caracteristica> caracteristicas = caracteristicaDAOFacade.buscarTodos();

				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M1"), caracteristicas));
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
	public Response buscarCaracteristicaPorDescricao(String token, String idioma, String descricao) {
		try {
			return buildResponse(caracteristicaDAOFacade.buscarPorDescricao(descricao));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

}
