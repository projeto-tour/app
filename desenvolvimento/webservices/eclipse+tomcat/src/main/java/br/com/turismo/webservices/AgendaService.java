package br.com.turismo.webservices;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/agenda/")
public interface AgendaService {
	@GET
	@Path("salvar/{token}/{idioma}/{idtipoagenda}/{descricao}/{datainicio}/{datafim}/{idusuario}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response salvarAgenda(@PathParam("token") String token, @PathParam("idioma") String idioma, 
			@PathParam("idtipoagenda") Long idtipoagenda, @PathParam("descricao") String descricao, @PathParam("datainicio")String datainicio, @PathParam("datafim")String datafim, @PathParam("idusuario")Long idusuario);

	@GET
	@Path("atualizar/{token}/{idioma}/{id}/{idusuario}/{idtipoagenda}/{descricao}/{datainicio}/{datafim}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response atualizarAgenda(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("id") Long id,
			@PathParam("idusuario") Long idusuario,@PathParam("idtipoagenda") Long idtipoagenda,@PathParam("descricao") String descricao, 
			@PathParam("datainicio") String datainicio, @PathParam("datafim") String datafim);

	@GET
	@Path("remover/{token}/{idioma}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response removerAgenda(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("id") Long id);

	@GET
	@Path("buscarPorId/{token}/{idioma}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarAgendaPorId(@PathParam("token") String token, @PathParam("idioma") String idioma, @PathParam("id") Long id);

	@GET
	@Path("buscar/{token}/{idioma}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarAgendaTodos(@PathParam("token") String token, @PathParam("idioma") String idioma);

	@GET
	@Path("buscarPorDataInicio/{token}/{idioma}/{datainicio}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaAgendaPorDataInicio(@PathParam("token") String token, @PathParam("idioma") String idioma,
			@PathParam("datainicio") String datainicio);
	
	@GET
	@Path("buscarPorDataFim/{token}/{idioma}/{datafim}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaAgendaPorDataFim(@PathParam("token") String token, @PathParam("idioma") String idioma,
			@PathParam("datafim") String datafim);
	
	@GET
	@Path("buscarPorDataCriacao/{token}/{idioma}/{datacriacao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaAgendaPorDataCriacao(@PathParam("token") String token, @PathParam("idioma") String idioma,
			@PathParam("datacriacao") String datacriacao);
	
	@GET
	@Path("buscarPorTipoAgenda/{token}/{idioma}/{idtipoagenda}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarAgendaPorTipoAgenda(@PathParam("token") String token, @PathParam("idioma") String idioma,
			@PathParam("idtipoagenda") Long idtipoagenda);
	
	@GET
	@Path("buscarPorDescricao/{token}/{idioma}/{descricao}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaAgendaPorDescricao(@PathParam("token") String token, @PathParam("idioma") String idioma,
			@PathParam("descricao") String descricao);
	
	@GET
	@Path("buscarPorDescricaoUsuario/{token}/{idioma}/{descricao}/{idusuario}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaAgendaPorDescricaoUsuario(@PathParam("token") String token, @PathParam("idioma") String idioma,
			@PathParam("descricao") String descricao, @PathParam("idusuario") Long idusuario);

}
