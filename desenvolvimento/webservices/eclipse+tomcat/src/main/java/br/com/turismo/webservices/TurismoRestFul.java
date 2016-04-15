package br.com.turismo.webservices;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.core.Response;

@RequestScoped
public class TurismoRestFul extends TurismoRestFulAbstract {

	// -- DIVERSOS

	@Override
	public Response aplicacao(String token) {
		return super.usuarioRestFul.aplicacao(token);
	}

	// -- USUARIO

//	@Override
//	public Response salvarUsuario(String token, String nome, String email, String senha, String alias) {
//		return super.usuarioRestFul.salvarUsuario(token, nome, email, senha, alias);
//	}
//
//	@Override
//	public Response atualizarUsuario(String token, Long id, String nome, String email, String senha, String alias) {
//		return super.usuarioRestFul.atualizarUsuario(token, id, nome, email, senha, alias);
//	}
//
//	@Override
//	public Response removerUsuario(String token, Long id) {
//		return super.usuarioRestFul.removerUsuario(token, id);
//	}
//
//	@Override
//	public Response buscarUsuarioPorEmailSenha(String token, String email, String senha) {
//		return super.usuarioRestFul.buscarUsuarioPorEmailSenha(token, email, senha);
//	}
//
//	@Override
//	public Response buscarUsuarioPorId(String token, Long id) {
//		return super.usuarioRestFul.buscarUsuarioPorId(token, id);
//	}
//
//	@Override
//	public Response buscarUsuarioTodos(String token) {
//		return super.usuarioRestFul.buscarUsuarioTodos(token);
//	}
//
//	@Override
//	public Response buscarUsuarioPorEmail(String token, String email) {
//		return super.usuarioRestFul.buscarUsuarioPorEmail(token, email);
//	}
//
//	@Override
//	public Response buscarUsuarioPorNome(String token, String nome) {
//		return super.usuarioRestFul.buscarUsuarioPorNome(token, nome);
//	}

	// -- TIPOAVALIACAO

	@Override
	public Response salvarAvaliacao(String token, String descricao) {
		return super.avaliacaoRestFul.salvarAvaliacao(token, descricao);
	}

	@Override
	public Response atualizarAvaliacao(String token, Long id, String descricao) {
		return super.avaliacaoRestFul.atualizarAvaliacao(token, id, descricao);
	}

	@Override
	public Response removerAvaliacao(String token, Long id) {
		return super.avaliacaoRestFul.removerAvaliacao(token, id);
	}

	@Override
	public Response buscarAvaliacaoPorId(String token, Long id) {
		return super.avaliacaoRestFul.buscarAvaliacaoPorId(token, id);
	}

	@Override
	public Response buscarAvaliacaoTodas(String token) {
		return super.avaliacaoRestFul.buscarAvaliacaoTodas(token);
	}

	@Override
	public Response buscarAvaliacaoPorDescricao(String token, String descricao) {
		return super.avaliacaoRestFul.buscarAvaliacaoPorDescricao(token, descricao);
	}

	// -- TIPOTRANSPORTE

/*	@Override
	public Response salvarTipoTransporte(String token, String descricao) {
		return super.tipoTransporteRestFul.salvarTipoTransporte(token, descricao);
	}

	@Override
	public Response atualizarTipoTransporte(String token, Long id, String descricao) {
		return super.tipoTransporteRestFul.atualizarTipoTransporte(token, id, descricao);
	}

	@Override
	public Response removerTipoTransporte(String token, Long id) {
		return super.tipoTransporteRestFul.removerTipoTransporte(token, id);
	}

	@Override
	public Response buscarTipoTransportePorId(String token, Long id) {
		return super.tipoTransporteRestFul.buscarTipoTransportePorId(token, id);
	}

	@Override
	public Response buscarTipoTransporteTodos(String token) {
		return super.tipoTransporteRestFul.buscarTipoTransporteTodos(token);
	}

	@Override
	public Response buscarTipoTransportePorDescricao(String token, String descricao) {
		return super.tipoTransporteRestFul.buscarTipoTransportePorDescricao(token, descricao);
	}*/

}
