package br.com.turismo.core.entities;

import java.io.Serializable;
import java.util.ArrayList;
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
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "transporte")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "Transporte.findAll", query = "SELECT t FROM Transporte t"),
		@NamedQuery(name = "Transporte.findById", query = "SELECT t FROM Transporte t WHERE t.id = :id"),
		@NamedQuery(name = "Transporte.findByDescricao", query = "SELECT t FROM Transporte t WHERE t.descricao = :descricao") })
public class Transporte implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Long id;
	@Basic(optional = false)
	@Column(name = "descricao")
	private String descricao;
	@JoinColumn(name = "id_tipo_transporte", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private TipoTransporte tipoTransporte;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "transporte")
	private List<Rota> rotas;

	public Transporte() {
	}

	public Transporte(Long id) {
		this.id = id;
	}

	public Transporte(Long id, String descricao) {
		this.id = id;
		this.descricao = descricao;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public TipoTransporte getTipoTransporte() {
		return tipoTransporte;
	}

	public void setTipoTransporte(TipoTransporte tipoTransporte) {
		this.tipoTransporte = tipoTransporte;
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
		if (!(object instanceof Transporte)) {
			return false;
		}
		Transporte other = (Transporte) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "db.Transporte[ id=" + id + " ]";
	}

}
