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
@Table(name = "tipo_ponto_interesse")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "TipoPontoInteresse.findAll", query = "SELECT t FROM TipoPontoInteresse t"),
		@NamedQuery(name = "TipoPontoInteresse.findById", query = "SELECT t FROM TipoPontoInteresse t WHERE t.id = :id"),
		@NamedQuery(name = "TipoPontoInteresse.findByDescricao", query = "SELECT t FROM TipoPontoInteresse t WHERE t.descricao = :descricao") })
public class TipoPontoInteresse implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Long id;
	@Basic(optional = false)
	@Column(name = "descricao")
	private String descricao;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "tipoPontoInteresse")
	private List<CaracteristicaTipoPontoInteresse> caracteristicasTipoPontoInteresse;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "tipoPontoInteresse")
	private List<PreferenciasUsuario> preferenciasUsuario;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "tipoPontoInteresse")
	private List<PontoInteresse> pontosInteresse;

	public TipoPontoInteresse() {
	}

	public TipoPontoInteresse(Long id) {
		this.id = id;
	}

	public TipoPontoInteresse(Long id, String descricao) {
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
	public List<CaracteristicaTipoPontoInteresse> getCaracteristicasTipoPontoInteresse() {
		return caracteristicasTipoPontoInteresse;
	}

	public void setCaracteristicasTipoPontoInteresse(
			List<CaracteristicaTipoPontoInteresse> caracteristicaTipoPontoInteresse) {
		this.caracteristicasTipoPontoInteresse = caracteristicaTipoPontoInteresse;
	}

	@XmlTransient
	public List<PreferenciasUsuario> getPreferenciasUsuario() {
		if (preferenciasUsuario == null) {
			preferenciasUsuario = new ArrayList<>();
		}
		return preferenciasUsuario;
	}

	public void setPreferenciasUsuario(List<PreferenciasUsuario> preferenciasUsuario) {
		this.preferenciasUsuario = preferenciasUsuario;
	}

	@XmlTransient
	public List<PontoInteresse> getPontosInteresse() {
		if (pontosInteresse == null) {
			pontosInteresse = new ArrayList<>();
		}
		return pontosInteresse;
	}

	public void setPontosInteresse(List<PontoInteresse> pontosInteresse) {
		this.pontosInteresse = pontosInteresse;
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
		if (!(object instanceof TipoPontoInteresse)) {
			return false;
		}
		TipoPontoInteresse other = (TipoPontoInteresse) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "db.TipoPontoInteresse[ id=" + id + " ]";
	}

}
