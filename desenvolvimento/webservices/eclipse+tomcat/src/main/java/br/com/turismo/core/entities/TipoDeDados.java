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
@Table(name = "tipo_de_dado")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "TipoDeDados.findAll", query = "SELECT t FROM TipoDeDados t"),
		@NamedQuery(name = "TipoDeDados.findById", query = "SELECT t FROM TipoDeDados t WHERE t.id = :id"),
		@NamedQuery(name = "TipoDeDados.findByDescricao", query = "SELECT t FROM TipoDeDados t WHERE t.descricao = :descricao") })
public class TipoDeDados implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Long id;
	@Basic(optional = false)
	@Column(name = "descricao")
	private String descricao;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "tipoDeDado")
	private List<Caracteristica> caracteristicas;

	public TipoDeDados() {
	}

	public TipoDeDados(Long id) {
		this.id = id;
	}

	public TipoDeDados(String descricao) {
		this.descricao = descricao;
	}
	
	public TipoDeDados(Long id, String descricao) {
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

	@XmlTransient
	public List<Caracteristica> getCaracteristicas() {
		if (caracteristicas == null) {
			caracteristicas = new ArrayList<>();
		}
		return caracteristicas;
	}

	public void setCaracteristicas(List<Caracteristica> caracteristicas) {
		this.caracteristicas = caracteristicas;
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
		if (!(object instanceof TipoDeDados)) {
			return false;
		}
		TipoDeDados other = (TipoDeDados) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "db.TipoDeDados[ id=" + id + " ]";
	}

}
