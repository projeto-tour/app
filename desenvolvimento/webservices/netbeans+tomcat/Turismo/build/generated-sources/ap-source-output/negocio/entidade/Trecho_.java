package negocio.entidade;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Trecho.class)
public abstract class Trecho_ {

	public static volatile SingularAttribute<Trecho, String> pontoPartida;
	public static volatile SingularAttribute<Trecho, String> pontoChegada;
	public static volatile SingularAttribute<Trecho, Percurso> percurso;
	public static volatile SingularAttribute<Trecho, Integer> distancia;
	public static volatile SingularAttribute<Trecho, Transporte> transporte;
	public static volatile SingularAttribute<Trecho, Integer> id;
	public static volatile SingularAttribute<Trecho, PontoInteresse> pontoInteresse;

}

