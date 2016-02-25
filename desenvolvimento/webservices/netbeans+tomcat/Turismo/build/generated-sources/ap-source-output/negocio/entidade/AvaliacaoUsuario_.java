package negocio.entidade;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(AvaliacaoUsuario.class)
public abstract class AvaliacaoUsuario_ {

	public static volatile SingularAttribute<AvaliacaoUsuario, Boolean> recomendar;
	public static volatile SingularAttribute<AvaliacaoUsuario, Date> dataAvaliacao;
	public static volatile SingularAttribute<AvaliacaoUsuario, Usuario> usuario;
	public static volatile SingularAttribute<AvaliacaoUsuario, Integer> id;
	public static volatile SingularAttribute<AvaliacaoUsuario, String> comentario;
	public static volatile SingularAttribute<AvaliacaoUsuario, Avaliacao> avaliacao;
	public static volatile SingularAttribute<AvaliacaoUsuario, PontoInteresse> pontoInteresse;

}

