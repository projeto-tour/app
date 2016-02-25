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
@Table(name = "avaliacao")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "Avaliacao.findByDescricao", query = "SELECT a FROM Avaliacao a WHERE a.descricao = :descricao") })
public class Avaliacao implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Long id;
	@Basic(optional = false)
	@Column(name = "descricao")
	private String descricao;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "avaliacao")
	private List<AvaliacaoUsuario> avaliacaoUsuarioList;

	public Avaliacao() {
	}

	public Avaliacao(Long id, String descricao) {
		super();
		this.id = id;
		this.descricao = descricao;
	}

	public Avaliacao(String descricao) {
		super();
		this.descricao = descricao;
	}

	public Avaliacao(Long id) {
		this.id = id;
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
	public List<AvaliacaoUsuario> getAvaliacaoUsuarioList() {
		return avaliacaoUsuarioList;
	}

	public void setAvaliacaoUsuarioList(List<AvaliacaoUsuario> avaliacaoUsuarioList) {
		this.avaliacaoUsuarioList = avaliacaoUsuarioList;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		if (!(object instanceof Avaliacao)) {
			return false;
		}
		Avaliacao other = (Avaliacao) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "br.com.turismo.core.model.Avaliacao[ id=" + id + " ]";
	}

}
