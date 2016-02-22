package br.com.turismo.webservices.restful;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
public interface TurismoRestFulInterface {

	@GET
	@Path("aplicacao/{token}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response aplicacao(@PathParam("token") String token);

	@GET
	@Path("usuario/inserir/{token}/{nome}/{email}/{senha}/{alias}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response inserirUsuario(@PathParam("token") String token,
			@PathParam("nome") String nome, @PathParam("email") String email,
			@PathParam("senha") String senha, @PathParam("alias") String alias);

	@GET
	@Path("usuario/alterar/{token}/{id}/{nome}/{email}/{senha}/{alias}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response alterarUsuario(@PathParam("token") String token,
			@PathParam("id") Long id, @PathParam("nome") String nome,
			@PathParam("email") String email, @PathParam("senha") String senha,
			@PathParam("alias") String alias);

	@GET
	@Path("usuario/remover/{token}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response removerUsuario(@PathParam("token") String token,
			@PathParam("id") Long id);

	@GET
	@Path("usuario/buscar/{token}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarUsuario(@PathParam("token") String token,
			@PathParam("id") Long id);

	@GET
	@Path("usuario/buscar/{token}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTodosUsuarios(@PathParam("token") String token);

	@GET
	@Path("usuario/controleacesso/{token}/{email}/{senha}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response controleAcesso(@PathParam("token") String token,
			@PathParam("email") String email, @PathParam("senha") String senha);

	@GET
	@Path("avaliacao/inserir/{token}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response inserirAvaliacao(@PathParam("token") String token,
			@PathParam("descricao") String descricao);

	@GET
	@Path("avaliacao/alterar/{token}/{id}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response alterarAvaliacao(@PathParam("token") String token,
			@PathParam("id") Long id, @PathParam("descricao") String descricao);

	@GET
	@Path("avaliacao/remover/{token}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response removerAvaliacao(@PathParam("token") String token,
			@PathParam("id") Long id);

	@GET
	@Path("avaliacao/buscar/{token}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarAvaliacao(@PathParam("token") String token,
			@PathParam("id") Long id);

	@GET
	@Path("avaliacao/buscar/{token}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTodasAvaliacoes(@PathParam("token") String token);

	@GET
	@Path("tipoHospedagem/inserir/{token}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response inserirTipoHospedagem(@PathParam("token") String token,
			@PathParam("descricao") String descricao);

	@GET
	@Path("tipoHospedagem/alterar/{token}/{id}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response alterarTipoHospedagem(@PathParam("token") String token,
			@PathParam("id") Integer id,
			@PathParam("descricao") String descricao);

	@GET
	@Path("tipoHospedagem/remover/{token}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response removerTipoHospedagem(@PathParam("token") String token,
			@PathParam("id") Integer id);

	@GET
	@Path("tipoHospedagem/buscar/{token}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTipoHospedagem(@PathParam("token") String token,
			@PathParam("id") Integer id);

	@GET
	@Path("tipoHospedagem/buscar/{token}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTodosTiposHospedagem(@PathParam("token") String token);

	@GET
	@Path("tipoTransporte/inserir/{token}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response inserirTipoTransporte(@PathParam("token") String token,
			@PathParam("descricao") String descricao);

	@GET
	@Path("tipoTransporte/alterar/{token}/{id}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response alterarTipoTransporte(@PathParam("token") String token,
			@PathParam("id") Integer id,
			@PathParam("descricao") String descricao);

	@GET
	@Path("tipoTransporte/remover/{token}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response removerTipoTransporte(@PathParam("token") String token,
			@PathParam("id") Integer id);

	@GET
	@Path("tipoTransporte/buscar/{token}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTipoTransporte(@PathParam("token") String token,
			@PathParam("id") Integer id);

	@GET
	@Path("tipoTransporte/buscar/{token}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTodosTiposTransporte(@PathParam("token") String token);
}
