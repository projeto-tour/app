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
@Table(name = "preferencias_usuario")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "PreferenciasUsuario.findAll", query = "SELECT p FROM PreferenciasUsuario p"),
		@NamedQuery(name = "PreferenciasUsuario.findById", query = "SELECT p FROM PreferenciasUsuario p WHERE p.id = :id") })
public class PreferenciasUsuario implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Long id;
	@JoinColumn(name = "usuario_id", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private Usuario usuario;
	@JoinColumn(name = "tipo_ponto_interesse_id", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private TipoPontoInteresse tipoPontoInteresse;

	public PreferenciasUsuario() {
	}

	public PreferenciasUsuario(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
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
		if (!(object instanceof PreferenciasUsuario)) {
			return false;
		}
		PreferenciasUsuario other = (PreferenciasUsuario) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "db.PreferenciasUsuario[ id=" + id + " ]";
	}

}
