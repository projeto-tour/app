/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservice;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author paulkibe
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(webservice.AgendaFacadeREST.class);
        resources.add(webservice.AlimentacaoFacadeREST.class);
        resources.add(webservice.AvaliacaoFacadeREST.class);
        resources.add(webservice.AvaliacaoUsuarioFacadeREST.class);
        resources.add(webservice.EspecialidadeFacadeREST.class);
        resources.add(webservice.EventoFacadeREST.class);
        resources.add(webservice.HospedagemFacadeREST.class);
        resources.add(webservice.NegociosFacadeREST.class);
        resources.add(webservice.PasseioFacadeREST.class);
        resources.add(webservice.PercursoFacadeREST.class);
        resources.add(webservice.PontoInteresseFacadeREST.class);
        resources.add(webservice.PreferenciasUsuarioFacadeREST.class);
        resources.add(webservice.TipoAgendaFacadeREST.class);
        resources.add(webservice.TipoEventoFacadeREST.class);
        resources.add(webservice.TipoHospedagemFacadeREST.class);
        resources.add(webservice.TipoPasseioFacadeREST.class);
        resources.add(webservice.TipoTransporteFacadeREST.class);
        resources.add(webservice.TransporteFacadeREST.class);
        resources.add(webservice.TrechoFacadeREST.class);
        resources.add(webservice.UsuarioFacadeREST.class);
    }
    
}
