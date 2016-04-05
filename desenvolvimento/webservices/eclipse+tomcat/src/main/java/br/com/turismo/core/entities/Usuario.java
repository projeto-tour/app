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
import javax.persistence.UniqueConstraint;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "usuario", uniqueConstraints={@UniqueConstraint(columnNames = {"email", "alias"})})
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "Usuario.findAll", query = "SELECT u FROM Usuario u"),
		@NamedQuery(name = "Usuario.findById", query = "SELECT u FROM Usuario u WHERE u.id = :id"),
		@NamedQuery(name = "Usuario.findByEmail", query = "SELECT u FROM Usuario u WHERE u.email = :email"),
		@NamedQuery(name = "Usuario.findBySenha", query = "SELECT u FROM Usuario u WHERE u.senha = :senha"),
		@NamedQuery(name = "Usuario.findByAlias", query = "SELECT u FROM Usuario u WHERE u.alias = :alias"),
		@NamedQuery(name = "Usuario.findByNome", query = "SELECT u FROM Usuario u WHERE u.nome = :nome"), 
		@NamedQuery(name = "Usuario.isDuplicate", query = "SELECT u FROM Usuario u WHERE u.email = :nome and u.alias = :alias") })
public class Usuario implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Long id;
	@Basic(optional = false)
	@Column(name = "email")
	private String email;
	@Basic(optional = false)
	@Column(name = "senha")
	private String senha;
	@Basic(optional = false)
	@Column(name = "alias")
	private String alias;
	@Basic(optional = false)
	@Column(name = "nome")
	private String nome;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "usuario")
	private List<Agenda> agendas;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "usuario")
	private List<PreferenciasUsuario> preferencias;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "usuario")
	private List<AvaliacaoUsuario> avaliacoes;

	public Usuario() {
	}

	public Usuario(Long id) {
		this.id = id;
	}

	public Usuario(Long id, String email, String senha, String alias, String nome) {
		this.id = id;
		this.email = email;
		this.senha = senha;
		this.alias = alias;
		this.nome = nome;
	}
	
	public Usuario(String nome, String email, String senha, String alias) {
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.alias = alias;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	@XmlTransient
	public List<Agenda> getAgendas() {
		if (agendas == null) {
			agendas = new ArrayList<>();
		}
		return agendas;
	}

	public void setAgendas(List<Agenda> agendas) {
		this.agendas = agendas;
	}

	@XmlTransient
	public List<PreferenciasUsuario> getPreferencias() {
		if (preferencias == null) {
			preferencias = new ArrayList<>();
		}
		return preferencias;
	}

	public void setPreferencias(List<PreferenciasUsuario> preferencias) {
		this.preferencias = preferencias;
	}

	@XmlTransient
	public List<AvaliacaoUsuario> getAvaliacoes() {
		if (avaliacoes == null) {
			avaliacoes = new ArrayList<>();
		}
		return avaliacoes;
	}

	public void setAvaliacoes(List<AvaliacaoUsuario> avaliacoes) {
		this.avaliacoes = avaliacoes;
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
		if (!(object instanceof Usuario)) {
			return false;
		}
		Usuario other = (Usuario) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "db.Usuario[ id=" + id + " ]";
	}

}
