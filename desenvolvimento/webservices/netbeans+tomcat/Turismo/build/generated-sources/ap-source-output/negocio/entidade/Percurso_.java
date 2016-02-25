package negocio.entidade;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Percurso.class)
public abstract class Percurso_ {

	public static volatile SingularAttribute<Percurso, String> pontoPartida;
	public static volatile SingularAttribute<Percurso, String> pontoChegada;
	public static volatile SingularAttribute<Percurso, Date> dataFim;
	public static volatile ListAttribute<Percurso, Trecho> trechoList;
	public static volatile SingularAttribute<Percurso, Integer> id;
	public static volatile SingularAttribute<Percurso, Date> dataInicio;
	public static volatile SingularAttribute<Percurso, Agenda> agenda;

}

