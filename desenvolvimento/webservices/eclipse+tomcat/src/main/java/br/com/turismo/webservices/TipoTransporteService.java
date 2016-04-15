package br.com.turismo.webservices;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/tipotransporte/")
public interface TipoTransporteService {
	
	@GET
	@Path("salvar/{token}/{idioma}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response salvarTipoTransporte(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("descricao") String descricao);

	@GET
	@Path("atualizar/{token}/{idioma}/{id}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response atualizarTipoTransporte(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("id") Long id,
			@PathParam("descricao") String descricao);

	@GET
	@Path("remover/{token}/{idioma}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response removerTipoTransporte(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("id") Long id);

	@GET
	@Path("buscarPorId/{token}/{idioma}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTipoTransportePorId(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("id") Long id);

	@GET
	@Path("buscar/{token}/{idioma}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTipoTransporteTodos(@PathParam("token") String token, @PathParam("idioma") String idioma);

	@GET
	@Path("buscarPorDescricao/{token}/{idioma}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTipoTransportePorDescricao(@PathParam("token") String token, @PathParam("idioma") String idioma,
			@PathParam("descricao") String descricao);

}
