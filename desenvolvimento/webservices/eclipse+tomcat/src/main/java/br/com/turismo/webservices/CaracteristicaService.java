package br.com.turismo.webservices;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/caracteristica/")
public interface CaracteristicaService {
	// -- CARACTERISTICAS

		@GET
		@Path("salvar/{token}/{idioma}/{descricao}/{tipoDeDado}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response salvarCaracteristica(@PathParam("token") String token,@PathParam("idioma") String idioma, @PathParam("descricao") String descricao,  
				@PathParam("tipoDeDado") Long tipoDeDado);
		

		@GET
		@Path("atualizar/{token}/{idioma}/{id}/{descricao}/{tipoDeDado}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response atualizarCaracteristica(@PathParam("token") String token,@PathParam("idioma") String idioma, @PathParam("id") Long id,
				@PathParam("descricao") String descricao,@PathParam("tipoDeDado") Long tipoDeDado);

		@GET
		@Path("remover/{token}/{idioma}/{id}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response removerCaracteristica(@PathParam("token") String token,@PathParam("idioma") String idioma, @PathParam("id") Long id);

		@GET
		@Path("buscarPorId/{token}/{idioma}/{id}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response buscarCaracteristicaPorId(@PathParam("token") String token,@PathParam("idioma") String idioma, @PathParam("id") Long id);

		@GET
		@Path("buscar/{token}/{idioma}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response buscarCaracteristicaTodas(@PathParam("token") String token,@PathParam("idioma") String idioma);

		@GET
		@Path("buscarPorDescricao/{token}/{idioma}/{descricao}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response buscarCaracteristicaPorDescricao(@PathParam("token") String token,@PathParam("idioma") String idioma,
				@PathParam("descricao") String descricao);
		

}
