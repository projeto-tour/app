/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.turismo.core.model;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "negocios")
@NamedQueries({ @NamedQuery(name = "Negocios.findAll", query = "SELECT n FROM Negocios n"),
		@NamedQuery(name = "Negocios.findById", query = "SELECT n FROM Negocios n WHERE n.id = :id"),
		@NamedQuery(name = "Negocios.findByPontoInteresseId", query = "SELECT n FROM Negocios n WHERE n.pontoInteresse.id = :pontoInteresseId"),
		@NamedQuery(name = "Negocios.findByReuniao", query = "SELECT n FROM Negocios n WHERE n.reuniao = :reuniao") })
public class Negocios implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Integer id;
	@Column(name = "reuniao")
	private Boolean reuniao;
	@JoinColumn(name = "ponto_interesse_id", referencedColumnName = "id", insertable = false, updatable = false)
	@ManyToOne(optional = false)
	private PontoInteresse pontoInteresse;

	public Negocios() {
	}

	public Negocios(Integer id, Boolean reuniao, PontoInteresse pontoInteresse) {
		this.id = id;
		this.reuniao = reuniao;
		this.pontoInteresse = pontoInteresse;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Boolean getReuniao() {
		return reuniao;
	}

	public void setReuniao(Boolean reuniao) {
		this.reuniao = reuniao;
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
		if (!(object instanceof Negocios)) {
			return false;
		}
		Negocios other = (Negocios) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "br.com.turismo.core.model.Negocios[ id=" + id + " ]";
	}

}
