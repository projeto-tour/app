# Partiu! - 2016

### Bootstraping Projeto Web Services - RESTful (MAC)

URL AWS: https://turismo.signin.aws.amazon.com/console

##### 1. Instalar e configurar o JDK 8
    1. Updates
        sudo apt-get update
    2. Download JDK
        sudo apt-get install default-jdk
    3. Configurur o JDK 
        sudo update-alternatives --config java
##### 2. Instalar e configurar o Netbeans 8.1
    1. Download
        https://netbeans.org/downloads/
##### 3. Instalar e configurar o Tomcat 8
    1. Download
        wget http://mirror.sdunix.com/apache/tomcat/tomcat-8/v8.0.30/bin/apache-tomcat-8.0.30.tar.gz
    2. Instalar 
        sudo mkdir /usr/local/apache-tomcat-8.0.30
        sudo tar xvf apache-tomcat-8*tar.gz -C /usr/local/apache-tomcat-8.0.30 --strip-components=1
    3. Configurar os modulos e usuarios do tomcat
        sudo nano /usr/local/apache-tomcat-8.0.30/conf/tomcat-users.xml
            <tomcat-users xmlns="http://tomcat.apache.org/xml"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://tomcat.apache.org/xml tomcat-users.xsd"
              version="1.0">
                <user username="admin" password="admin" roles="manager-script, manager-gui, admin-gui"/>
            </tomcat-users>
##### 4. Criar workspace do projeto e abra o netbeans e crie os projetos web services no mesmo
##### 5. Configurar o servidor de banco de dados - MySQL (Tenha em mãos os dados de configuração do banco de dados)
    - Banco de Dados - Partiu!
        URL: partiu-db.czpy9u3mzzpv.us-west-2.rds.amazonaws.com
        Porta: 3306
        Nome do Banco de Dados: partiu_db
        Usuario: partiu_db
        Senha: partiu_db
        JNDI: jdbc/turismo 
    - Testes e validadção do banco de dados configurado
##### 6. Configurar o servidor de aplicação - Tomcat 8
    - Configurar o servidor de aplicação
    - Testes e validadção do servidor de aplicação
##### 7. Criar projeto web com suporte a webservices restful a partir de um Banco de dados
    1. Criar o Projeto Web
    2. Criar Unidade de Persistencia
    3. Criar os pacotes do java para separação de camadas
        - Camada webservices
        - Camada negocio.entidade
        - Camada negocio.fachada
        - Camada negocio.exception
        - Camada persistencia
    3. Gerar Classes de Entidade e Serviços RESTful a partir do banco de dados configurado para o projeto
    4. Gerenciar os api e bibliotecas de suporte
        Implementação da especificação do JPA
            - Hibernate 4.3.x(JPA2.1)
                - Download jandex-2.0.1.Final.jar para dentro da pasta 
                    (/Applications/NetBeans/NetBeans\ 8.1.app/Contents/Resources/NetBeans/java/modules/ext/hibernate4)
                - Apos download, adicione o jar para essa biblioteca.
                    mv /Users/paulkibe/Downloads/jandex-2.0.1.Final.jar /Applications/NetBeans/NetBeans\ 8.1.app/Contents/Resources/NetBeans/java/modules/ext/hibernate4
        Implementação da especificação do JAX-RS
            - JAX_RS 2.0
            - Jersey 2.5.1 (JAX-RS RI)
        Implementações das especificações dos APIs do JAVA EE 7
            - Biblioteca de API Java EE 7
        Implementação da especificação do JDBC
            - Driver JDBC do MySQL
    5. Refatoração de codigo
        1. Gerenciar o mapeamento das entidades com as tabelas de banco de dados
        2. Separação de camadas
            Webservices
                    - ApplicationConfig (Modulo de configuração dos webservices)
                    - WebServicesAbstract
                    - EntidadeRestFulInterface (Interfaces de RestFul Webservices)
                    - EntidadeRestFul (Implementação das Interfaces de RestFul Webservices)
            Negocio (Camada de regra de negocio)
                Entidade (Camada de entidades)
                    - Entidade
                Fachada (Camada de fachadas)
                    - EntidadeFachada
                Exception (Camada de exceções customizadas)
                    - CustomException
            Persistencia (Camada de persistencia)
                    - GenericDAO
                    - EntidadeDAO (Repositorios das entidades (DAO de cada entidade))
         3. Limpar e construir o projeto
##### 8. Criar projeto web como cliente de teste para testar Web services RESTful
##### 9. Testar os Web Services RESTful no browser
