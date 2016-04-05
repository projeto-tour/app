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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "caracteristica")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "Caracteristica.findAll", query = "SELECT c FROM Caracteristica c"),
		@NamedQuery(name = "Caracteristica.findById", query = "SELECT c FROM Caracteristica c WHERE c.id = :id"),
		@NamedQuery(name = "Caracteristica.findByDescricao", query = "SELECT c FROM Caracteristica c WHERE c.descricao = :descricao") })
public class Caracteristica implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Long id;
	@Basic(optional = false)
	@Column(name = "descricao")
	private String descricao;
	@JoinColumn(name = "tipo_de_dados_id", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private TipoDeDados tipoDeDado;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "caracteristicaTipoPontoInteresse")
	private List<CaracteristicaTipoPontoInteresse> caracteristicasTipoPontoInteresse;

	public Caracteristica() {
	}

	public Caracteristica(Long id) {
		this.id = id;
	}

	public Caracteristica(String descricao) {
		this.descricao = descricao;
	}
	
	public Caracteristica(Long id, String descricao) {
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

	public TipoDeDados getTipoDeDados() {
		return tipoDeDado;
	}

	public void setTipoDeDados(TipoDeDados tipoDeDado) {
		this.tipoDeDado = tipoDeDado;
	}

	@XmlTransient
	public List<CaracteristicaTipoPontoInteresse> getCaracteristicasTipoPontoInteresse() {
		if (caracteristicasTipoPontoInteresse == null) {
			caracteristicasTipoPontoInteresse = new ArrayList<>();
		}
		return caracteristicasTipoPontoInteresse;
	}

	public void setCaracteristicasTipoPontoInteresse(
			List<CaracteristicaTipoPontoInteresse> caracteristicasTipoPontoInteresse) {
		this.caracteristicasTipoPontoInteresse = caracteristicasTipoPontoInteresse;
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
		if (!(object instanceof Caracteristica)) {
			return false;
		}
		Caracteristica other = (Caracteristica) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "db.Caracteristica[ id=" + id + " ]";
	}

}
