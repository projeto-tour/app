/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package negocio.entidade;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author paulkibe
 */
@Entity
@Table(name = "percurso")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Percurso.findAll", query = "SELECT p FROM Percurso p"),
    @NamedQuery(name = "Percurso.findById", query = "SELECT p FROM Percurso p WHERE p.id = :id"),
    @NamedQuery(name = "Percurso.findByAgendaId", query = "SELECT p FROM Percurso p WHERE p.agenda.id = :agendaId"),
    @NamedQuery(name = "Percurso.findByDataInicio", query = "SELECT p FROM Percurso p WHERE p.dataInicio = :dataInicio"),
    @NamedQuery(name = "Percurso.findByDataFim", query = "SELECT p FROM Percurso p WHERE p.dataFim = :dataFim"),
    @NamedQuery(name = "Percurso.findByPontoPartida", query = "SELECT p FROM Percurso p WHERE p.pontoPartida = :pontoPartida"),
    @NamedQuery(name = "Percurso.findByPontoChegada", query = "SELECT p FROM Percurso p WHERE p.pontoChegada = :pontoChegada")})
public class Percurso implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "data_inicio")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataInicio;
    @Column(name = "data_fim")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataFim;
    @Basic(optional = false)
    @Column(name = "ponto_partida")
    private String pontoPartida;
    @Column(name = "ponto_chegada")
    private String pontoChegada;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "percurso")
    private List<Trecho> trechoList;
    @JoinColumn(name = "agenda_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Agenda agenda;

    public Percurso() {
    }

    public Percurso(Integer id, Date dataInicio, Date dataFim, String pontoPartida, String pontoChegada, List<Trecho> trechoList, Agenda agenda) {
        this.id = id;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.pontoPartida = pontoPartida;
        this.pontoChegada = pontoChegada;
        this.trechoList = trechoList;
        this.agenda = agenda;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(Date dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Date getDataFim() {
        return dataFim;
    }

    public void setDataFim(Date dataFim) {
        this.dataFim = dataFim;
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

    @XmlTransient
    public List<Trecho> getTrechoList() {
        return trechoList;
    }

    public void setTrechoList(List<Trecho> trechoList) {
        this.trechoList = trechoList;
    }

    public Agenda getAgenda() {
        return agenda;
    }

    public void setAgenda(Agenda agenda) {
        this.agenda = agenda;
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
        if (!(object instanceof Percurso)) {
            return false;
        }
        Percurso other = (Percurso) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "negocio.entidade.Percurso[ id=" + id + " ]";
    }
    
}
