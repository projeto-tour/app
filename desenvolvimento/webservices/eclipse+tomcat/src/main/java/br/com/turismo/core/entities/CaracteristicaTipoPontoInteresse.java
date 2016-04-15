package br.com.turismo.core.entities;

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
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "caracteristica_tipo_ponto_interesse")
@XmlRootElement
@NamedQueries({
		@NamedQuery(name = "CaracteristicaTipoPontoInteresse.findAll", query = "SELECT c FROM CaracteristicaTipoPontoInteresse c"),
		@NamedQuery(name = "CaracteristicaTipoPontoInteresse.findById", query = "SELECT c FROM CaracteristicaTipoPontoInteresse c WHERE c.id = :id"),
		@NamedQuery(name = "CaracteristicaTipoPontoInteresse.findByObrigatorio", query = "SELECT c FROM CaracteristicaTipoPontoInteresse c WHERE c.obrigatorio = :obrigatorio"),
		@NamedQuery(name = "CaracteristicaTipoPontoInteresse.findByValor", query = "SELECT c FROM CaracteristicaTipoPontoInteresse c WHERE c.valor = :valor") })
public class CaracteristicaTipoPontoInteresse implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Long id;
	
	@Basic(optional = false)
	@Column(name = "obrigatorio")
	private boolean obrigatorio;
	
	@Column(name = "valor")
	private String valor;
	
	@JoinColumn(name = "caracteristica_tipo_ponto_interesse_id", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private Caracteristica caracteristicaTipoPontoInteresse;
	
	@JoinColumn(name = "tipo_ponto_interesse_id", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private TipoPontoInteresse tipoPontoInteresse;

	public CaracteristicaTipoPontoInteresse() {
	}

	public CaracteristicaTipoPontoInteresse(Long id) {
		this.id = id;
	}

	public CaracteristicaTipoPontoInteresse(Long id, boolean obrigatorio) {
		this.id = id;
		this.obrigatorio = obrigatorio;
	}

	public CaracteristicaTipoPontoInteresse(Caracteristica caracteristicaTipoPontoInteresse, TipoPontoInteresse tipoPontoInteresse, boolean obrigatorio) {
		this.caracteristicaTipoPontoInteresse = caracteristicaTipoPontoInteresse;
		this.tipoPontoInteresse = tipoPontoInteresse;
		this.obrigatorio = obrigatorio;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean getObrigatorio() {
		return obrigatorio;
	}

	public void setObrigatorio(boolean obrigatorio) {
		this.obrigatorio = obrigatorio;
	}

	public String getValor() {
		return valor;
	}

	public void setValor(String valor) {
		this.valor = valor;
	}

	public Caracteristica getCaracteristicaTipoPontoInteresse() {
		return caracteristicaTipoPontoInteresse;
	}

	public void setCaracteristicaTipoPontoInteresse(Caracteristica caracteristicaTipoPontoInteresse) {
		this.caracteristicaTipoPontoInteresse = caracteristicaTipoPontoInteresse;
	}

	public TipoPontoInteresse getTipoPontoInteresse() {
		return tipoPontoInteresse;
	}

	public void setTipoPontoInteresse(TipoPontoInteresse tipoPontoInteresse) {
		this.tipoPontoInteresse = tipoPontoInteresse;
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
		if (!(object instanceof CaracteristicaTipoPontoInteresse)) {
			return false;
		}
		CaracteristicaTipoPontoInteresse other = (CaracteristicaTipoPontoInteresse) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "db.CaracteristicaTipoPontoInteresse[ id=" + id + " ]";
	}

}
