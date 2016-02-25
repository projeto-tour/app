/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.turismo.core.model;

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

/**
 *
 * @author paulkibe
 */
@Entity
@Table(name = "tipo_hospedagem")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "TipoHospedagem.findByDescricao", query = "SELECT t FROM TipoHospedagem t WHERE t.descricao = :descricao") })
public class TipoHospedagem implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Integer id;
	@Basic(optional = false)
	@Column(name = "descricao")
	private String descricao;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "tipoHospedagem")
	private List<Hospedagem> hospedagemList;

	public TipoHospedagem() {
	}

	public TipoHospedagem(String descricao) {
		super();
		this.descricao = descricao;
	}

	public TipoHospedagem(Integer id) {
		this.id = id;
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

	@XmlTransient
	public List<Hospedagem> getHospedagemList() {
		return hospedagemList;
	}

	public void setHospedagemList(List<Hospedagem> hospedagemList) {
		this.hospedagemList = hospedagemList;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		if (!(object instanceof TipoHospedagem)) {
			return false;
		}
		TipoHospedagem other = (TipoHospedagem) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "br.com.turismo.core.model.TipoHospedagem[ id=" + id + " ]";
	}

}
