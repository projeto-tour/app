package negocio.entidade;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Transporte.class)
public abstract class Transporte_ {

	public static volatile ListAttribute<Transporte, Trecho> trechoList;
	public static volatile SingularAttribute<Transporte, Long> id;
	public static volatile SingularAttribute<Transporte, TipoTransporte> tipoTransporte;
	public static volatile SingularAttribute<Transporte, String> descricao;

}

