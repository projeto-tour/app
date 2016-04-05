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
@Table(name = "ponto_interesse")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "PontoInteresse.findAll", query = "SELECT p FROM PontoInteresse p"),
		@NamedQuery(name = "PontoInteresse.findById", query = "SELECT p FROM PontoInteresse p WHERE p.id = :id"),
		@NamedQuery(name = "PontoInteresse.findByDescricao", query = "SELECT p FROM PontoInteresse p WHERE p.descricao = :descricao"),
		@NamedQuery(name = "PontoInteresse.findByLocalizacao", query = "SELECT p FROM PontoInteresse p WHERE p.localizacao = :localizacao"),
		@NamedQuery(name = "PontoInteresse.findByObservacao", query = "SELECT p FROM PontoInteresse p WHERE p.observacao = :observacao") })
public class PontoInteresse implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Long id;
	@Basic(optional = false)
	@Column(name = "descricao")
	private String descricao;
	@Column(name = "localizacao")
	private String localizacao;
	@Column(name = "observacao")
	private String observacao;
	@JoinColumn(name = "tipo_ponto_interesse_id", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private TipoPontoInteresse tipoPontoInteresse;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "pontoInteresse")
	private List<AvaliacaoUsuario> avaliacoesUsuarios;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "pontoInteresse")
	private List<Rota> rotas;

	public PontoInteresse() {
	}

	public PontoInteresse(Long id) {
		this.id = id;
	}

	public PontoInteresse(Long id, String descricao) {
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

	public String getLocalizacao() {
		return localizacao;
	}

	public void setLocalizacao(String localizacao) {
		this.localizacao = localizacao;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public TipoPontoInteresse getTipoPontoInteresse() {
		return tipoPontoInteresse;
	}

	public void setTipoPontoInteresse(TipoPontoInteresse tipoPontoInteresse) {
		this.tipoPontoInteresse = tipoPontoInteresse;
	}

	@XmlTransient
	public List<AvaliacaoUsuario> getAvaliacoesUsuarios() {
		if (avaliacoesUsuarios == null) {
			avaliacoesUsuarios = new ArrayList<>();
		}
		return avaliacoesUsuarios;
	}

	public void getAvaliacoesUsuarios(List<AvaliacaoUsuario> avaliacoesUsuarios) {
		this.avaliacoesUsuarios = avaliacoesUsuarios;
	}

	@XmlTransient
	public List<Rota> getRotas() {
		if (rotas == null) {
			rotas = new ArrayList<>();
		}
		return rotas;
	}

	public void setRotas(List<Rota> rotas) {
		this.rotas = rotas;
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
		if (!(object instanceof PontoInteresse)) {
			return false;
		}
		PontoInteresse other = (PontoInteresse) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "db.PontoInteresse[ id=" + id + " ]";
	}

}
