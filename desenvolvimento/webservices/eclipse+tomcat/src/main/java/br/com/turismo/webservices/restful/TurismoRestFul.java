package br.com.turismo.webservices.restful;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.core.Response;

@RequestScoped
public class TurismoRestFul extends TurismoRestFulAbstract {

	@Override
	public Response aplicacao(String token) {
		return service.aplicacao(token);
	}

	@Override
	public Response controleAcesso(String token, String email, String senha) {
		return service.controleAcesso(token, email, senha);
	}

	@Override
	public Response inserirUsuario(String token, String nome, String email,
			String senha, String alias) {
		return service.insertUsuario(token, nome, email, senha, alias);
	}

	@Override
	public Response alterarUsuario(String token, Long id, String nome,
			String email, String senha, String alias) {
		return service.updateUsuario(token, id, nome, email, senha, alias);
	}

	@Override
	public Response removerUsuario(String token, Long id) {
		return service.deleteUsuario(token, id);
	}

	@Override
	public Response buscarUsuario(String token, Long id) {
		return service.findUsuario(token, id);
	}

	@Override
	public Response buscarTodosUsuarios(String token) {
		return service.findAllUsuario(token);
	}

	@Override
	public Response inserirAvaliacao(String token, String descricao) {
		return service.insertAvaliacao(token, descricao);
	}

	@Override
	public Response alterarAvaliacao(String token, Long id, String descricao) {
		return service.updateAvaliacao(token, id, descricao);
	}

	@Override
	public Response removerAvaliacao(String token, Long id) {
		return service.deleteAvaliacao(token, id);
	}

	@Override
	public Response buscarAvaliacao(String token, Long id) {
		return service.findAvaliacao(token, id);
	}

	@Override
	public Response buscarTodasAvaliacoes(String token) {
		return service.findAllAvaliacao(token);
	}

	@Override
	public Response inserirTipoHospedagem(String token, String descricao) {
		return service.insertTipoHospedagem(token, descricao);
	}

	@Override
	public Response alterarTipoHospedagem(String token, Integer id,
			String descricao) {
		return service.updateTipoHospedagem(token, id, descricao);
	}

	@Override
	public Response removerTipoHospedagem(String token, Integer id) {
		return service.deleteTipoHospedagem(token, id);
	}

	@Override
	public Response buscarTipoHospedagem(String token, Integer id) {
		return service.findTipoHospedagem(token, id);
	}

	@Override
	public Response buscarTodosTiposHospedagem(String token) {
		return service.findAllTipoHospedagem(token);
	}

	@Override
	public Response inserirTipoTransporte(String token, String descricao) {
		return service.insertTipoTransporte(token, descricao);
	}

	@Override
	public Response alterarTipoTransporte(String token, Integer id,
			String descricao) {
		return service.updateTipoTransporte(token, id, descricao);
	}

	@Override
	public Response removerTipoTransporte(String token, Integer id) {
		return service.deleteTipoTransporte(token, id);
	}

	@Override
	public Response buscarTipoTransporte(String token, Integer id) {
		return service.findTipoTransporte(token, id);
	}

	@Override
	public Response buscarTodosTiposTransporte(String token) {
		return service.findAllTipoTransporte(token);
	}

}
