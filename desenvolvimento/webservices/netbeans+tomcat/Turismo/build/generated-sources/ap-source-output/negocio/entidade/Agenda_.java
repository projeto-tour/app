package negocio.entidade;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Agenda.class)
public abstract class Agenda_ {

	public static volatile SingularAttribute<Agenda, Date> dataCriacaoAgenda;
	public static volatile SingularAttribute<Agenda, Date> dataFim;
	public static volatile SingularAttribute<Agenda, TipoAgenda> tipoAgenda;
	public static volatile ListAttribute<Agenda, Percurso> percursoList;
	public static volatile SingularAttribute<Agenda, Usuario> usuario;
	public static volatile SingularAttribute<Agenda, Integer> id;
	public static volatile SingularAttribute<Agenda, Date> dataInicio;
	public static volatile SingularAttribute<Agenda, String> descricao;

}

