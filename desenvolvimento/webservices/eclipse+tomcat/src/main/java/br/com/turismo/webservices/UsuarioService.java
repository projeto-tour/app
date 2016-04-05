package br.com.turismo.webservices;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/usuario/")
public interface UsuarioService {

	@GET
	@Path("salvar/{token}/{idioma}/{nome}/{email}/{senha}/{alias}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response salvarUsuario(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("nome") String nome,
			@PathParam("email") String email, @PathParam("senha") String senha, @PathParam("alias") String alias);

	@GET
	@Path("atualizar/{token}/{idioma}/{id}/{nome}/{email}/{senha}/{alias}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response atualizarUsuario(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("id") Long id,
			@PathParam("nome") String nome, @PathParam("email") String email, @PathParam("senha") String senha,
			@PathParam("alias") String alias);

	@GET
	@Path("remover/{token}/{idioma}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response removerUsuario(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("id") Long id);

	@GET
	@Path("buscarPorId/{token}/{idioma}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarUsuarioPorId(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("id") Long id);

	@GET
	@Path("buscar/{token}/{idioma}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarUsuarioTodos(@PathParam("token") String token, @PathParam("idioma") String idioma);

	@GET
	@Path("buscarPorEmailSenha/{token}/{idioma}/{email}/{senha}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarUsuarioPorEmailSenha(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("email") String email,
			@PathParam("senha") String senha);

	@GET
	@Path("buscarPorEmail/{token}/{idioma}/{email}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarUsuarioPorEmail(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("email") String email);

	@GET
	@Path("buscarPorNome/{token}/{idioma}/{nome}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarUsuarioPorNome(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("nome") String nome);
}
