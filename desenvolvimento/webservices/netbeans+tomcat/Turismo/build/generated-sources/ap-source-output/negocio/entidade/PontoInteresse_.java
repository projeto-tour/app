package negocio.entidade;

import java.math.BigDecimal;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(PontoInteresse.class)
public abstract class PontoInteresse_ {

	public static volatile SingularAttribute<PontoInteresse, String> observacao;
	public static volatile SingularAttribute<PontoInteresse, String> localizacao;
	public static volatile ListAttribute<PontoInteresse, Hospedagem> hospedagemList;
	public static volatile ListAttribute<PontoInteresse, Alimentacao> alimentacaoList;
	public static volatile ListAttribute<PontoInteresse, PreferenciasUsuario> preferenciasUsuarioList;
	public static volatile ListAttribute<PontoInteresse, Evento> eventoList;
	public static volatile ListAttribute<PontoInteresse, Negocios> negociosList;
	public static volatile SingularAttribute<PontoInteresse, Date> dataSaida;
	public static volatile SingularAttribute<PontoInteresse, String> descricao;
	public static volatile ListAttribute<PontoInteresse, Passeio> passeioList;
	public static volatile SingularAttribute<PontoInteresse, BigDecimal> custo;
	public static volatile ListAttribute<PontoInteresse, Trecho> trechoList;
	public static volatile SingularAttribute<PontoInteresse, Date> dataChegada;
	public static volatile SingularAttribute<PontoInteresse, Long> id;
	public static volatile ListAttribute<PontoInteresse, AvaliacaoUsuario> avaliacaoUsuarioList;

}

