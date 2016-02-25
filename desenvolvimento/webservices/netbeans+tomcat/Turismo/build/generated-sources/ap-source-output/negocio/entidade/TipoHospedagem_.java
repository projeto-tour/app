package negocio.entidade;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(TipoHospedagem.class)
public abstract class TipoHospedagem_ {

	public static volatile ListAttribute<TipoHospedagem, Hospedagem> hospedagemList;
	public static volatile SingularAttribute<TipoHospedagem, Integer> id;
	public static volatile SingularAttribute<TipoHospedagem, String> descricao;

}

