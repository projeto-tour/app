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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "tipo_transporte")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "TipoTransporte.findAll", query = "SELECT t FROM TipoTransporte t"),
		@NamedQuery(name = "TipoTransporte.findById", query = "SELECT t FROM TipoTransporte t WHERE t.id = :id"),
		@NamedQuery(name = "TipoTransporte.findByDescricao", query = "SELECT t FROM TipoTransporte t WHERE t.descricao = :descricao") })
public class TipoTransporte implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Integer id;
	@Basic(optional = false)
	@Column(name = "descricao")
	private String descricao;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "tipoTransporte")
	private List<Transporte> transportes;

	public TipoTransporte() {
	}

	public TipoTransporte(String descricao){
		this.descricao = descricao;
	}
	
	public TipoTransporte(Integer id) {
		this.id = id;
	}

	public TipoTransporte(Integer id, String descricao) {
		this.id = id;
		this.descricao = descricao;
	}

	public TipoTransporte(String descricao, List<Transporte> transportes){
		this.descricao = descricao;
		this.transportes = transportes;
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
	public List<Transporte> getTransportes() {
		if (transportes == null) {
			transportes = new ArrayList<>();
		}
		return transportes;
	}

	public void setTransportes(List<Transporte> transportes) {
		this.transportes = transportes;
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
		if (!(object instanceof TipoTransporte)) {
			return false;
		}
		TipoTransporte other = (TipoTransporte) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "db.TipoTransporte[ id=" + id + " ]";
	}

}
