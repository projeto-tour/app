package negocio.entidade;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Passeio.class)
public abstract class Passeio_ {

	public static volatile SingularAttribute<Passeio, TipoPasseio> tipoPasseio;
	public static volatile SingularAttribute<Passeio, Integer> id;
	public static volatile SingularAttribute<Passeio, String> descricao;
	public static volatile SingularAttribute<Passeio, PontoInteresse> pontoInteresse;

}

