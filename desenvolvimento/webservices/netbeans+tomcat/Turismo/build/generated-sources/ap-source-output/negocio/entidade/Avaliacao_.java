package negocio.entidade;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Avaliacao.class)
public abstract class Avaliacao_ {

	public static volatile SingularAttribute<Avaliacao, Long> id;
	public static volatile ListAttribute<Avaliacao, AvaliacaoUsuario> avaliacaoUsuarioList;
	public static volatile SingularAttribute<Avaliacao, String> descricao;

}

