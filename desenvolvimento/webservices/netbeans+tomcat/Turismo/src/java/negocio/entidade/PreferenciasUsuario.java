/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package negocio.entidade;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author paulkibe
 */
@Entity
@Table(name = "preferencias_usuario")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PreferenciasUsuario.findAll", query = "SELECT p FROM PreferenciasUsuario p"),
    @NamedQuery(name = "PreferenciasUsuario.findById", query = "SELECT p FROM PreferenciasUsuario p WHERE p.id = :id"),
    @NamedQuery(name = "PreferenciasUsuario.findByUsuarioId", query = "SELECT p FROM PreferenciasUsuario p WHERE p.usuario.id = :usuarioId"),
    @NamedQuery(name = "PreferenciasUsuario.findByPontoInteresseId", query = "SELECT p FROM PreferenciasUsuario p WHERE p.pontoInteresse.id = :pontoInteresseId")})
public class PreferenciasUsuario implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @JoinColumn(name = "ponto_interesse_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private PontoInteresse pontoInteresse;
    @JoinColumn(name = "usuario_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Usuario usuario;

    public PreferenciasUsuario() {
    }

    public PreferenciasUsuario(Integer id, PontoInteresse pontoInteresse, Usuario usuario) {
        this.id = id;
        this.pontoInteresse = pontoInteresse;
        this.usuario = usuario;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public PontoInteresse getPontoInteresse() {
        return pontoInteresse;
    }

    public void setPontoInteresse(PontoInteresse pontoInteresse) {
        this.pontoInteresse = pontoInteresse;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PreferenciasUsuario)) {
            return false;
        }
        PreferenciasUsuario other = (PreferenciasUsuario) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "negocio.entidade.PreferenciasUsuario[ id=" + id + " ]";
    }
    
}
