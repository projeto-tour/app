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

/**
 *
 * @author Wellington_Camargo
 */
@Entity
@Table(name = "tipo_hospedagem")
@NamedQueries({
		@NamedQuery(name = "TipoHospedagem.findAll", query = "SELECT t FROM TipoHospedagem t"),
		@NamedQuery(name = "TipoHospedagem.findById", query = "SELECT t FROM TipoHospedagem t WHERE t.id = :id"),
		@NamedQuery(name = "TipoHospedagem.findByDescricao", query = "SELECT t FROM TipoHospedagem t WHERE t.descricao = :descricao") })
public class TipoHospedagem implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Integer id;
	@Basic(optional = false)
	// @NotNull
	// @Size(min = 1, max = 50)
	@Column(name = "descricao")
	private String descricao;

	public TipoHospedagem() {
	}

	public TipoHospedagem(Integer id) {
		this.id = id;
	}

	public TipoHospedagem(String descricao) {
		this.descricao = descricao;
	}

	public TipoHospedagem(Integer id, String descricao) {
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
		if (!(object instanceof TipoHospedagem)) {
			return false;
		}
		TipoHospedagem other = (TipoHospedagem) object;
		if ((this.id == null && other.id != null)
				|| (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "br.ufscar.dc.partiuws.entities.TipoHospedagem[ id=" + id + " ]";
	}

}
