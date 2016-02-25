package negocio.entidade;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Alimentacao.class)
public abstract class Alimentacao_ {

	public static volatile SingularAttribute<Alimentacao, Especialidade> especialidade;
	public static volatile SingularAttribute<Alimentacao, Integer> id;
	public static volatile SingularAttribute<Alimentacao, String> descricao;
	public static volatile SingularAttribute<Alimentacao, PontoInteresse> pontoInteresse;

}

