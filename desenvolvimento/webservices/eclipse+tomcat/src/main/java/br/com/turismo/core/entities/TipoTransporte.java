package br.com.turismo.core.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

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
	private Long id;
	@Basic(optional = false)
	@Column(name = "descricao")
	private String descricao;

	public TipoTransporte() {
	}

	public TipoTransporte(String descricao){
		this.descricao = descricao;
	}
	
	public TipoTransporte(Long id) {
		this.id = id;
	}

	public TipoTransporte(Long id, String descricao) {
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
