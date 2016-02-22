package br.com.turismo.core.service;

import javax.ws.rs.core.Response.Status;
import java.io.IOException;
import java.io.Serializable;

import javax.inject.Inject;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import br.com.turismo.core.facade.AvaliacoesFacade;
import br.com.turismo.core.facade.TiposHospedagemFacade;
import br.com.turismo.core.facade.TiposTransporteFacade;
import br.com.turismo.core.facade.UsuariosFacade;
import br.com.turismo.core.model.Avaliacao;
import br.com.turismo.core.model.TipoHospedagem;
import br.com.turismo.core.model.TipoTransporte;
import br.com.turismo.core.model.Usuario;

public class TurismoRestFulService implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private UsuariosService cadastroUsuario;

	@Inject
	private UsuariosFacade usuariosFacade;

	@Inject
	private AvaliacoesFacade avaliacoesFacade;

	@Inject
	private TiposHospedagemFacade tiposHospedagemFacade;

	@Inject
	private TiposTransporteFacade tiposTransporteFacade;

	ObjectMapper mapper = new ObjectMapper();

	public Response aplicacao(String token) {
		try {
			return getResponse(TurismoRestFulService.class.getPackage());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response insertUsuario(String token, String nome, String email,
			String senha, String alias) {
		try {
			return getResponse(usuariosFacade.inserir(new Usuario(null, nome,
					email, senha, alias)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response updateUsuario(String token, Long id, String nome,
			String email, String senha, String alias) {
		try {
			return getResponse(usuariosFacade.alterar(new Usuario(id, nome,
					email, senha, alias)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response deleteUsuario(String token, Long id) {
		try {
			return getResponse(usuariosFacade.remove(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response findUsuario(String token, Long id) {
		try {
			return getResponse(usuariosFacade.find(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response findAllUsuario(String token) {
		try {
			return getResponse(usuariosFacade.findAll());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response controleAcesso(String token, String email, String senha) {
		try {
			return getResponse(cadastroUsuario.controleacesso(email, senha));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response insertAvaliacao(String token, String descricao) {
		try {
			return getResponse(avaliacoesFacade
					.inserir(new Avaliacao(descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response updateAvaliacao(String token, Long id, String descricao) {
		try {
			return getResponse(avaliacoesFacade.alterar(new Avaliacao(id,
					descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response deleteAvaliacao(String token, Long id) {
		try {
			return getResponse(avaliacoesFacade.remove(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response findAvaliacao(String token, Long id) {
		try {
			return getResponse(avaliacoesFacade.find(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response findAllAvaliacao(String token) {
		try {
			return getResponse(avaliacoesFacade.findAll());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response insertTipoHospedagem(String token, String descricao) {
		try {
			return getResponse(tiposHospedagemFacade
					.inserir(new TipoHospedagem(descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response updateTipoHospedagem(String token, Integer id,
			String descricao) {
		try {
			return getResponse(tiposHospedagemFacade
					.alterar(new TipoHospedagem(id, descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response deleteTipoHospedagem(String token, Integer id) {
		try {
			return getResponse(tiposHospedagemFacade.remove(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response findTipoHospedagem(String token, Integer id) {
		try {
			return getResponse(tiposHospedagemFacade.find(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response findAllTipoHospedagem(String token) {
		try {
			return getResponse(tiposHospedagemFacade.findAll());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response insertTipoTransporte(String token, String descricao) {
		try {
			return getResponse(tiposTransporteFacade
					.inserir(new TipoTransporte(descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response updateTipoTransporte(String token, Integer id,
			String descricao) {
		try {
			return getResponse(tiposTransporteFacade
					.alterar(new TipoTransporte(id, descricao)));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response deleteTipoTransporte(String token, Integer id) {
		try {
			return getResponse(tiposTransporteFacade.remove(id));
		} catch (Exception e) {
			return Response.ok().entity(e.getMessage()).build();
		}
	}

	public Response findTipoTransporte(String token, Integer id) {
		try {
			return getResponse(tiposTransporteFacade.find(id));
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	public Response findAllTipoTransporte(String token) {
		try {
			return getResponse(tiposTransporteFacade.findAll());
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(toJsonString(e)).build();
		}
	}

	private Response getResponse(Object result) throws JsonGenerationException,
			JsonMappingException, IOException {
		return Response.ok().entity(mapper.writeValueAsString(result)).build();
	}
	
	private String toJsonString(Object object) {
		try {
			return mapper.writeValueAsString(object);
		} catch (Exception e) {
			return e.getMessage();
		}
	}
}
