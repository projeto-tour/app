package br.com.turismo.webservices;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/transporte/")
public interface TransporteService {
	
	@GET
	@Path("salvar/{token}/{idioma}/{idtipotransporte}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response salvarTransporte(@PathParam("token") String token, @PathParam("idioma") String idioma, 
			@PathParam("idtipotransporte") Long idtipotransporte, @PathParam("descricao") String descricao);

	@GET
	@Path("atualizar/{token}/{idioma}/{id}/{idtipotransporte}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response atualizarTransporte(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("id") Long id,
			@PathParam("idtipotransporte") Long idtipotransporte, @PathParam("descricao") String descricao);

	@GET
	@Path("remover/{token}/{idioma}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response removerTransporte(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("id") Long id);

	@GET
	@Path("buscarPorId/{token}/{idioma}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTransportePorId(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("id") Long id);

	@GET
	@Path("buscar/{token}/{idioma}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTransporteTodos(@PathParam("token") String token, @PathParam("idioma") String idioma);

	@GET
	@Path("buscarPorTipoTransporte/{token}/{idioma}/{idtipotransporte}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarTransportePorTipoTransporte(@PathParam("token") String token, @PathParam("idioma") String idioma,
			@PathParam("idtipotransporte") Long idtipotransporte);
	
	@GET
	@Path("buscarPorDescricao/{token}/{idioma}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaTransportePorDescricao(@PathParam("token") String token, @PathParam("idioma") String idioma,
			@PathParam("descricao") String descricao);

}
