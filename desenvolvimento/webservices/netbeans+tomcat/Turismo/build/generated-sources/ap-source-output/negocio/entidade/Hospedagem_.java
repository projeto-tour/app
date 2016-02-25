package negocio.entidade;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Hospedagem.class)
public abstract class Hospedagem_ {

	public static volatile SingularAttribute<Hospedagem, Boolean> reservado;
	public static volatile SingularAttribute<Hospedagem, TipoHospedagem> tipoHospedagem;
	public static volatile SingularAttribute<Hospedagem, Integer> id;
	public static volatile SingularAttribute<Hospedagem, Boolean> paga;
	public static volatile SingularAttribute<Hospedagem, PontoInteresse> pontoInteresse;

}

