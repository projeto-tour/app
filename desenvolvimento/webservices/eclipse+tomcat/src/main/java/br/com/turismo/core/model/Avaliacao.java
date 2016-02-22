package br.com.turismo.core.model;

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

@Entity
@Table(name = "avaliacao")
@NamedQueries({
		@NamedQuery(name = "Avaliacao.findAll", query = "SELECT a FROM Avaliacao a"),
		@NamedQuery(name = "Avaliacao.findById", query = "SELECT a FROM Avaliacao a WHERE a.id = :id"),
		@NamedQuery(name = "Avaliacao.findByDescricao", query = "SELECT a FROM Avaliacao a WHERE a.descricao = :descricao") })
public class Avaliacao implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Long id;

	@Basic(optional = false)
	// @NotNull
	@Column(name = "descricao")
	private String descricao;

	public Avaliacao() {
	}

	public Avaliacao(Long id) {
		this.id = id;
	}

	public Avaliacao(String descricao) {
		this.descricao = descricao;
	}

	public Avaliacao(Long id, String descricao) {
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
		if (!(object instanceof Avaliacao)) {
			return false;
		}
		Avaliacao other = (Avaliacao) object;
		if ((this.id == null && other.id != null)
				|| (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "br.ufscar.dc.partiuws.entities.Avaliacao[ id=" + id + " ]";
	}

}
