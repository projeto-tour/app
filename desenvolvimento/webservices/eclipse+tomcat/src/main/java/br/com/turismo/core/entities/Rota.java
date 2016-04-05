package br.com.turismo.core.entities;

import java.io.Serializable;
import java.util.ArrayList;
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

@Entity
@Table(name = "rota")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "Rota.findAll", query = "SELECT r FROM Rota r"),
		@NamedQuery(name = "Rota.findById", query = "SELECT r FROM Rota r WHERE r.id = :id"),
		@NamedQuery(name = "Rota.findByDataSaida", query = "SELECT r FROM Rota r WHERE r.dataSaida = :dataSaida"),
		@NamedQuery(name = "Rota.findByDataChegada", query = "SELECT r FROM Rota r WHERE r.dataChegada = :dataChegada"),
		@NamedQuery(name = "Rota.findByPontoPartida", query = "SELECT r FROM Rota r WHERE r.pontoPartida = :pontoPartida"),
		@NamedQuery(name = "Rota.findByPontoChegada", query = "SELECT r FROM Rota r WHERE r.pontoChegada = :pontoChegada"),
		@NamedQuery(name = "Rota.findByDistancia", query = "SELECT r FROM Rota r WHERE r.distancia = :distancia") })
public class Rota implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Long id;
	@Basic(optional = false)
	@Column(name = "data_saida")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataSaida;
	@Column(name = "data_chegada")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataChegada;
	@Basic(optional = false)
	@Column(name = "ponto_partida")
	private String pontoPartida;
	@Column(name = "ponto_chegada")
	private String pontoChegada;
	@Column(name = "distancia")
	private Integer distancia;
	@JoinColumn(name = "agenda_id", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private Agenda agenda;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "rotaPai")
	private List<Rota> rotas;
	@JoinColumn(name = "id_pai", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private Rota rotaPai;
	@JoinColumn(name = "transporte_id", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private Transporte transporte;
	@JoinColumn(name = "ponto_interesse_id", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private PontoInteresse pontoInteresse;

	public Rota() {
	}

	public Rota(Long id) {
		this.id = id;
	}
	
	public Rota(Agenda agenda, Rota rotaPai, List<Rota> rotas, PontoInteresse pontoInteresse, Transporte transporte, Date dataSaida, Date dataChegada, String pontoPartida, String pontoChegada, Integer distancia) {
		this.agenda = agenda;
		this.rotaPai = rotaPai;
		this.rotas = rotas;
		this.pontoInteresse = pontoInteresse;
		this.transporte = transporte;
		this.dataSaida = dataSaida;
		this.dataChegada = dataChegada;
		this.pontoPartida = pontoPartida;
		this.pontoPartida = pontoPartida;
		this.pontoChegada = pontoChegada;
		this.distancia = distancia;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDataSaida() {
		return dataSaida;
	}

	public void setDataSaida(Date dataSaida) {
		this.dataSaida = dataSaida;
	}

	public Date getDataChegada() {
		return dataChegada;
	}

	public void setDataChegada(Date dataChegada) {
		this.dataChegada = dataChegada;
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

	public Integer getDistancia() {
		return distancia;
	}

	public void setDistancia(Integer distancia) {
		this.distancia = distancia;
	}

	public Agenda getAgenda() {
		return agenda;
	}

	public void setAgenda(Agenda agenda) {
		this.agenda = agenda;
	}

	@XmlTransient
	public List<Rota> getRotas() {
		if (rotas == null) {
			rotas = new ArrayList<>();
		}
		return rotas;
	}

	public void setRotas(List<Rota> rotas) {
		this.rotas = rotas;
	}

	public Rota getRotaPai() {
		return rotaPai;
	}

	public void setRotaPai(Rota rotaPai) {
		this.rotaPai = rotaPai;
	}

	public Transporte getTransporte() {
		return transporte;
	}

	public void setTransporte(Transporte transporte) {
		this.transporte = transporte;
	}

	public PontoInteresse getPontoInteresse() {
		return pontoInteresse;
	}

	public void setPontoInteresse(PontoInteresse pontoInteresse) {
		this.pontoInteresse = pontoInteresse;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are
		// not set
		if (!(object instanceof Rota)) {
			return false;
		}
		Rota other = (Rota) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "db.Rota[ id=" + id + " ]";
	}

}
