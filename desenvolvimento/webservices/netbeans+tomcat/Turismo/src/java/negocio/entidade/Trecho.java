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
import javax.persistence.JoinColumns;
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
@Table(name = "trecho")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Trecho.findAll", query = "SELECT t FROM Trecho t"),
    @NamedQuery(name = "Trecho.findById", query = "SELECT t FROM Trecho t WHERE t.id = :id"),
    @NamedQuery(name = "Trecho.findByPercursoId", query = "SELECT t FROM Trecho t WHERE t.percurso.id = :percursoId"),
    @NamedQuery(name = "Trecho.findByPercursoAgendaId", query = "SELECT t FROM Trecho t WHERE t.percurso.id = :percursoAgendaId"),
    @NamedQuery(name = "Trecho.findByPontoPartida", query = "SELECT t FROM Trecho t WHERE t.pontoPartida = :pontoPartida"),
    @NamedQuery(name = "Trecho.findByPontoChegada", query = "SELECT t FROM Trecho t WHERE t.pontoChegada = :pontoChegada"),
    @NamedQuery(name = "Trecho.findByDistancia", query = "SELECT t FROM Trecho t WHERE t.distancia = :distancia")})
public class Trecho implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "ponto_partida")
    private String pontoPartida;
    @Basic(optional = false)
    @Column(name = "ponto_chegada")
    private String pontoChegada;
    @Basic(optional = false)
    @Column(name = "distancia")
    private int distancia;
    @JoinColumns({
        @JoinColumn(name = "percurso_id", referencedColumnName = "id", insertable = false, updatable = false),
        @JoinColumn(name = "percurso_agenda_id", referencedColumnName = "agenda_id", insertable = false, updatable = false)})
    @ManyToOne(optional = false)
    private Percurso percurso;
    @JoinColumn(name = "ponto_interesse_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private PontoInteresse pontoInteresse;
    @JoinColumn(name = "id_transporte", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Transporte transporte;

    public Trecho() {
    }

    public Trecho(Integer id, String pontoPartida, String pontoChegada, int distancia, Percurso percurso, PontoInteresse pontoInteresse, Transporte transporte) {
        this.id = id;
        this.pontoPartida = pontoPartida;
        this.pontoChegada = pontoChegada;
        this.distancia = distancia;
        this.percurso = percurso;
        this.pontoInteresse = pontoInteresse;
        this.transporte = transporte;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPontoPartida() {
        return pontoPartida;
    }

    public void setPontoPartida(String pontoPartida) {
        this.pontoPartida = pontoPartida;
    }

    public String getPontoChegada() {
        return pontoChegada;
    }

    public void setPontoChegada(String pontoChegada) {
        this.pontoChegada = pontoChegada;
    }

    public int getDistancia() {
        return distancia;
    }

    public void setDistancia(int distancia) {
        this.distancia = distancia;
    }

    public Percurso getPercurso() {
        return percurso;
    }

    public void setPercurso(Percurso percurso) {
        this.percurso = percurso;
    }

    public PontoInteresse getPontoInteresse() {
        return pontoInteresse;
    }

    public void setPontoInteresse(PontoInteresse pontoInteresse) {
        this.pontoInteresse = pontoInteresse;
    }

    public Transporte getTransporte() {
        return transporte;
    }

    public void setTransporte(Transporte transporte) {
        this.transporte = transporte;
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
        if (!(object instanceof Trecho)) {
            return false;
        }
        Trecho other = (Trecho) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "negocio.entidade.Trecho[ id=" + id + " ]";
    }
    
}
