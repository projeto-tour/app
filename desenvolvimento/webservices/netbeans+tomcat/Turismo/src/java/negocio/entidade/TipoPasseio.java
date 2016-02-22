/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package negocio.entidade;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author paulkibe
 */
@Entity
@Table(name = "tipo_passeio")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TipoPasseio.findAll", query = "SELECT t FROM TipoPasseio t"),
    @NamedQuery(name = "TipoPasseio.findById", query = "SELECT t FROM TipoPasseio t WHERE t.id = :id"),
    @NamedQuery(name = "TipoPasseio.findByDescricao", query = "SELECT t FROM TipoPasseio t WHERE t.descricao = :descricao")})
public class TipoPasseio implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "descricao")
    private String descricao;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "tipoPasseio")
    private List<Passeio> passeioList;

    public TipoPasseio() {
    }

    public TipoPasseio(Integer id) {
        this.id = id;
    }

    public TipoPasseio(Integer id, String descricao) {
        this.id = id;
        this.descricao = descricao;
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

    @XmlTransient
    public List<Passeio> getPasseioList() {
        return passeioList;
    }

    public void setPasseioList(List<Passeio> passeioList) {
        this.passeioList = passeioList;
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
        if (!(object instanceof TipoPasseio)) {
            return false;
        }
        TipoPasseio other = (TipoPasseio) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "negocio.entidade.TipoPasseio[ id=" + id + " ]";
    }
    
}
