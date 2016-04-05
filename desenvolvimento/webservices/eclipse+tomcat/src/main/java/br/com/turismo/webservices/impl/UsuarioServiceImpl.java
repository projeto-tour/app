package br.com.turismo.webservices.impl;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.turismo.core.dao.facade.UsuariosDAOFacade;
import br.com.turismo.core.entities.Usuario;
import br.com.turismo.core.util.exceptions.NegocioException;
import br.com.turismo.core.util.geral.JsonUtils;
import br.com.turismo.negocio.messages.Mensagens;
import br.com.turismo.webservices.UsuarioService;
import br.com.turismo.webservices.response.ResponseRest;

public class UsuarioServiceImpl extends ServiceAbstract implements UsuarioService {

	@Inject
	private UsuariosDAOFacade usuarioDAOFacade;

	@Override
	public Response salvarUsuario(String token, String idioma, String nome, String email, String senha, String alias) {

		// definindo idioma da request
		setLocale(idioma);

		try {
			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {
				
				usuarioDAOFacade.salvar(new Usuario(nome, email, senha, alias));
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M4")));
				
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
	public Response atualizarUsuario(String token, String idioma, Long id, String nome, String email, String senha,
			String alias) {
		
		// definindo idioma da request
		setLocale(idioma);
		
		try {
			
			if (validarToken(token)){
				
				Usuario usuario = usuarioDAOFacade.atualizar(new Usuario(id, nome, email, senha, alias));
				
				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M4"), usuario));
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
	public Response removerUsuario(String token, String idioma, Long id) {
		try {
			return buildResponse(usuarioDAOFacade.remover(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	@Override
	public Response buscarUsuarioPorId(String token, String idioma, Long id) {
		try {
			return buildResponse(usuarioDAOFacade.buscarPorId(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	@Override
	public Response buscarUsuarioTodos(String token, String idioma) {

		// definindo idioma da request
		setLocale(idioma);

		try {

			// validando token. Se ok, realiza a operacao, senao retorna erro
			if (validarToken(token)) {

				// realizando a consulta
				List<Usuario> usuarios = usuarioDAOFacade.buscarTodos();

				// montando retorno do servico
				this.setResponseRest(
						new ResponseRest(true, Mensagens.getMensagem(getLocale(), "M1"), usuarios));
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
	public Response buscarUsuarioPorEmailSenha(String token, String idioma, String email, String senha) {
		try {
			return buildResponse(usuarioDAOFacade.buscarPorEmailSenha(email, senha));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	@Override
	public Response buscarUsuarioPorEmail(String token, String idioma, String email) {
		try {
			return buildResponse(usuarioDAOFacade.buscarPorEmail(email));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

	@Override
	public Response buscarUsuarioPorNome(String token, String idioma, String nome) {
		try {
			return buildResponse(usuarioDAOFacade.buscarPorNome(nome));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(JsonUtils.toJson(e)).build();
		}
	}

}
