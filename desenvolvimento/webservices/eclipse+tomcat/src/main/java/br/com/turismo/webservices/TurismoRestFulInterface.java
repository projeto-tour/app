package br.com.turismo.webservices;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
public interface TurismoRestFulInterface {

	// -- USUARIO

	@GET
	@Path("aplicacao/{token}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response aplicacao(@PathParam("token") String token);

//	@GET
//	@Path("usuario/salvar/{token}/{nome}/{email}/{senha}/{alias}")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response salvarUsuario(@PathParam("token") String token, @PathParam("nome") String nome,
//			@PathParam("email") String email, @PathParam("senha") String senha, @PathParam("alias") String alias);
//
//	@GET
//	@Path("usuario/atualizar/{token}/{id}/{nome}/{email}/{senha}/{alias}")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response atualizarUsuario(@PathParam("token") String token, @PathParam("id") Long id,
//			@PathParam("nome") String nome, @PathParam("email") String email, @PathParam("senha") String senha,
//			@PathParam("alias") String alias);
//
//	@GET
//	@Path("usuario/remover/{token}/{id}")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response removerUsuario(@PathParam("token") String token, @PathParam("id") Long id);
//
//	@GET
//	@Path("usuario/buscarPorId/{token}/{id}")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response buscarUsuarioPorId(@PathParam("token") String token, @PathParam("id") Long id);
//
//	@GET
//	@Path("usuario/buscar/{token}")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response buscarUsuarioTodos(@PathParam("token") String token);
//
//	@GET
//	@Path("usuario/buscarPorEmailSenha/{token}/{email}/{senha}")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response buscarUsuarioPorEmailSenha(@PathParam("token") String token, @PathParam("email") String email,
//			@PathParam("senha") String senha);
//
//	@GET
//	@Path("usuario/buscarPorEmail/{token}/{email}")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response buscarUsuarioPorEmail(@PathParam("token") String token, @PathParam("email") String email);
//
//	@GET
//	@Path("usuario/buscarPorNome/{token}/{nome}")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response buscarUsuarioPorNome(@PathParam("token") String token, @PathParam("nome") String nome);

	// -- AVALIACAO

	@GET
	@Path("avaliacao/salvar/{token}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response salvarAvaliacao(@PathParam("token") String token, @PathParam("descricao") String descricao);

	@GET
	@Path("avaliacao/atualizar/{token}/{id}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response atualizarAvaliacao(@PathParam("token") String token, @PathParam("id") Long id,
			@PathParam("descricao") String descricao);

	@GET
	@Path("avaliacao/remover/{token}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response removerAvaliacao(@PathParam("token") String token, @PathParam("id") Long id);

	@GET
	@Path("avaliacao/buscarPorId/{token}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarAvaliacaoPorId(@PathParam("token") String token, @PathParam("id") Long id);

	@GET
	@Path("avaliacao/buscar/{token}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarAvaliacaoTodas(@PathParam("token") String token);

	@GET
	@Path("avaliacao/buscarPorDescricao/{token}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarAvaliacaoPorDescricao(@PathParam("token") String token,
			@PathParam("descricao") String descricao);

	// -- TIPOTRANSPORTE

	@GET
	@Path("tipoTransporte/salvar/{token}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response salvarTipoTransporte(@PathParam("token") String token, @PathParam("descricao") String descricao);

	@GET
	@Path("tipoTransporte/atualizar/{token}/{id}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response atualizarTipoTransporte(@PathParam("token") String token, @PathParam("id") Integer id,
			@PathParam("descricao") String descricao);

	@GET
	@Path("tipoTransporte/remover/{token}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response removerTipoTransporte(@PathParam("token") String token, @PathParam("id") Integer id);

	@GET
	@Path("tipoTransporte/buscarPorId/{token}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTipoTransportePorId(@PathParam("token") String token, @PathParam("id") Integer id);

	@GET
	@Path("tipoTransporte/buscar/{token}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTipoTransporteTodos(@PathParam("token") String token);

	@GET
	@Path("tipoTransporte/buscarPorDescricao/{token}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTipoTransportePorDescricao(@PathParam("token") String token,
			@PathParam("descricao") String descricao);

}
