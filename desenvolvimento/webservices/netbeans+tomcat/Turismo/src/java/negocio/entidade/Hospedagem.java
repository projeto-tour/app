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
@Table(name = "hospedagem")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Hospedagem.findAll", query = "SELECT h FROM Hospedagem h"),
    @NamedQuery(name = "Hospedagem.findById", query = "SELECT h FROM Hospedagem h WHERE h.id = :id"),
    @NamedQuery(name = "Hospedagem.findByPontoInteresseId", query = "SELECT h FROM Hospedagem h WHERE h.pontoInteresse.id = :pontoInteresseId"),
    @NamedQuery(name = "Hospedagem.findByReservado", query = "SELECT h FROM Hospedagem h WHERE h.reservado = :reservado"),
    @NamedQuery(name = "Hospedagem.findByPaga", query = "SELECT h FROM Hospedagem h WHERE h.paga = :paga")})
public class Hospedagem implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "reservado")
    private boolean reservado;
    @Basic(optional = false)
    @Column(name = "paga")
    private boolean paga;
    @JoinColumn(name = "ponto_interesse_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private PontoInteresse pontoInteresse;
    @JoinColumn(name = "tipo_hospedagem_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private TipoHospedagem tipoHospedagem;

    public Hospedagem() {
    }

    public Hospedagem(Integer id, boolean reservado, boolean paga, PontoInteresse pontoInteresse, TipoHospedagem tipoHospedagem) {
        this.id = id;
        this.reservado = reservado;
        this.paga = paga;
        this.pontoInteresse = pontoInteresse;
        this.tipoHospedagem = tipoHospedagem;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean getReservado() {
        return reservado;
    }

    public void setReservado(boolean reservado) {
        this.reservado = reservado;
    }

    public boolean getPaga() {
        return paga;
    }

    public void setPaga(boolean paga) {
        this.paga = paga;
    }

    public PontoInteresse getPontoInteresse() {
        return pontoInteresse;
    }

    public void setPontoInteresse(PontoInteresse pontoInteresse) {
        this.pontoInteresse = pontoInteresse;
    }

    public TipoHospedagem getTipoHospedagem() {
        return tipoHospedagem;
    }

    public void setTipoHospedagem(TipoHospedagem tipoHospedagem) {
        this.tipoHospedagem = tipoHospedagem;
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
        if (!(object instanceof Hospedagem)) {
            return false;
        }
        Hospedagem other = (Hospedagem) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "negocio.entidade.Hospedagem[ id=" + id + " ]";
    }
    
}
