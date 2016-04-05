package br.com.turismo.core.entities;

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

@Entity
@Table(name = "tipo_agenda")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "TipoAgenda.findAll", query = "SELECT t FROM TipoAgenda t"),
		@NamedQuery(name = "TipoAgenda.findById", query = "SELECT t FROM TipoAgenda t WHERE t.id = :id"),
		@NamedQuery(name = "TipoAgenda.findByDescricao", query = "SELECT t FROM TipoAgenda t WHERE t.descricao = :descricao") })
public class TipoAgenda implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Integer id;
	@Basic(optional = false)
	@Column(name = "descricao")
	private String descricao;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "tipoAgenda")
	private List<Agenda> agendas;

	public TipoAgenda() {
	}

	public TipoAgenda(Integer id) {
		this.id = id;
	}

	public TipoAgenda(String descricao) {
		this.descricao = descricao;
	}
	
	public TipoAgenda(Integer id, String descricao) {
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
	public List<Agenda> getAgendas() {
		return agendas;
	}

	public void setAgendas(List<Agenda> agendas) {
		this.agendas = agendas;
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
		if (!(object instanceof TipoAgenda)) {
			return false;
		}
		TipoAgenda other = (TipoAgenda) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "db.TipoAgenda[ id=" + id + " ]";
	}

}
