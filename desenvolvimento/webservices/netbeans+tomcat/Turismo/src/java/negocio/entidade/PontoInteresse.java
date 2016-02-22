/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package negocio.entidade;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author paulkibe
 */
@Entity
@Table(name = "ponto_interesse")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PontoInteresse.findAll", query = "SELECT p FROM PontoInteresse p"),
    @NamedQuery(name = "PontoInteresse.findById", query = "SELECT p FROM PontoInteresse p WHERE p.id = :id"),
    @NamedQuery(name = "PontoInteresse.findByDescricao", query = "SELECT p FROM PontoInteresse p WHERE p.descricao = :descricao"),
    @NamedQuery(name = "PontoInteresse.findByLocalizacao", query = "SELECT p FROM PontoInteresse p WHERE p.localizacao = :localizacao"),
    @NamedQuery(name = "PontoInteresse.findByCusto", query = "SELECT p FROM PontoInteresse p WHERE p.custo = :custo"),
    @NamedQuery(name = "PontoInteresse.findByObservacao", query = "SELECT p FROM PontoInteresse p WHERE p.observacao = :observacao"),
    @NamedQuery(name = "PontoInteresse.findByDataSaida", query = "SELECT p FROM PontoInteresse p WHERE p.dataSaida = :dataSaida"),
    @NamedQuery(name = "PontoInteresse.findByDataChegada", query = "SELECT p FROM PontoInteresse p WHERE p.dataChegada = :dataChegada")})
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
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "custo")
    private BigDecimal custo;
    @Column(name = "observacao")
    private String observacao;
    @Column(name = "data_saida")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataSaida;
    @Column(name = "data_chegada")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataChegada;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pontoInteresse")
    private List<Alimentacao> alimentacaoList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pontoInteresse")
    private List<Trecho> trechoList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pontoInteresse")
    private List<Negocios> negociosList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pontoInteresse")
    private List<PreferenciasUsuario> preferenciasUsuarioList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pontoInteresse")
    private List<Passeio> passeioList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pontoInteresse")
    private List<Evento> eventoList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pontoInteresse")
    private List<AvaliacaoUsuario> avaliacaoUsuarioList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pontoInteresse")
    private List<Hospedagem> hospedagemList;

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

    public BigDecimal getCusto() {
        return custo;
    }

    public void setCusto(BigDecimal custo) {
        this.custo = custo;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Date getDataSaida() {
        return dataSaida;
    }

    public void setDataSaida(Date dataSaida) {
        this.dataSaida = dataSaida;
    }

    public Date getDataChegada() {
        return dataChegada;
    }

    public void setDataChegada(Date dataChegada) {
        this.dataChegada = dataChegada;
    }

    @XmlTransient
    public List<Alimentacao> getAlimentacaoList() {
        return alimentacaoList;
    }

    public void setAlimentacaoList(List<Alimentacao> alimentacaoList) {
        this.alimentacaoList = alimentacaoList;
    }

    @XmlTransient
    public List<Trecho> getTrechoList() {
        return trechoList;
    }

    public void setTrechoList(List<Trecho> trechoList) {
        this.trechoList = trechoList;
    }

    @XmlTransient
    public List<Negocios> getNegociosList() {
        return negociosList;
    }

    public void setNegociosList(List<Negocios> negociosList) {
        this.negociosList = negociosList;
    }

    @XmlTransient
    public List<PreferenciasUsuario> getPreferenciasUsuarioList() {
        return preferenciasUsuarioList;
    }

    public void setPreferenciasUsuarioList(List<PreferenciasUsuario> preferenciasUsuarioList) {
        this.preferenciasUsuarioList = preferenciasUsuarioList;
    }

    @XmlTransient
    public List<Passeio> getPasseioList() {
        return passeioList;
    }

    public void setPasseioList(List<Passeio> passeioList) {
        this.passeioList = passeioList;
    }

    @XmlTransient
    public List<Evento> getEventoList() {
        return eventoList;
    }

    public void setEventoList(List<Evento> eventoList) {
        this.eventoList = eventoList;
    }

    @XmlTransient
    public List<AvaliacaoUsuario> getAvaliacaoUsuarioList() {
        return avaliacaoUsuarioList;
    }

    public void setAvaliacaoUsuarioList(List<AvaliacaoUsuario> avaliacaoUsuarioList) {
        this.avaliacaoUsuarioList = avaliacaoUsuarioList;
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
        // TODO: Warning - this method won't work in the case the id fields are not set
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
        return "negocio.entidade.PontoInteresse[ id=" + id + " ]";
    }
    
}
