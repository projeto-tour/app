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
@Table(name = "passeio")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Passeio.findAll", query = "SELECT p FROM Passeio p"),
    @NamedQuery(name = "Passeio.findById", query = "SELECT p FROM Passeio p WHERE p.id = :id"),
    @NamedQuery(name = "Passeio.findByPontoInteresseId", query = "SELECT p FROM Passeio p WHERE p.pontoInteresse.id = :pontoInteresseId"),
    @NamedQuery(name = "Passeio.findByDescricao", query = "SELECT p FROM Passeio p WHERE p.descricao = :descricao")})
public class Passeio implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "descricao")
    private String descricao;
    @JoinColumn(name = "ponto_interesse_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private PontoInteresse pontoInteresse;
    @JoinColumn(name = "id_tipo_passeio", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private TipoPasseio tipoPasseio;

    public Passeio() {
    }

    public Passeio(Integer id, String descricao, PontoInteresse pontoInteresse, TipoPasseio tipoPasseio) {
        this.id = id;
        this.descricao = descricao;
        this.pontoInteresse = pontoInteresse;
        this.tipoPasseio = tipoPasseio;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public PontoInteresse getPontoInteresse() {
        return pontoInteresse;
    }

    public void setPontoInteresse(PontoInteresse pontoInteresse) {
        this.pontoInteresse = pontoInteresse;
    }

    public TipoPasseio getTipoPasseio() {
        return tipoPasseio;
    }

    public void setTipoPasseio(TipoPasseio tipoPasseio) {
        this.tipoPasseio = tipoPasseio;
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
        if (!(object instanceof Passeio)) {
            return false;
        }
        Passeio other = (Passeio) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "negocio.entidade.Passeio[ id=" + id + " ]";
    }
    
}
