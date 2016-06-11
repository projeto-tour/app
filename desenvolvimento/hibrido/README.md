# Partiu! [Ionic 2, Angular 2 e Firebase 3] 

## Sistema de Gestão de Turismo

> Este sistema apóia a gestão de viagens, hospedagens, deslocamentos, agendamentos e reservas em passeios, excursões, e outros eventos turísticos. 
> Utiliza uma arquitetura que possibilita ao usuário compor serviços disponíveis para atender ao planejamento e execução de suas atividades de turismo. 
> Promove o turismo divulgando e facilitando sua exploração. Os serviços atendem a diversas necessidades do usuário que deseja realizar uma atividade de turismo. 
> A composição de serviços, desde o acesso e navegação na internet, possibilita planejar e executar suas atividades. 
> Toda a documentação e orientação são providas pelo sistema para facilitar ao usuário nesse planejamento e execução dessas atividades. 
> A reutilização de serviços já existentes ou construídos pelo sistema, torna-o flexível para atender as mais diversas composições conforme as necessidades dos usuários.
> O sistema deve catalogar com fotos os atrativos, criar roteiros turísticos temáticos, montar calendário anual de eventos, gerenciando as informações tornadas disponíveis por meio de um portal eletrônico na web.

### Seguem-se algumas features requisitadas pelos usuários desse sistema.
##### 1 - Mapas temáticos
    Com recursos do Google Maps, mapa ou satélite, fornece a localização dos atrativos e eventos turísticos.
##### 2 - Roteiros autoguiados
    A partir das informações do portal, podem criados roteiros de viagens, passeios, excursões e outros eventos turísticos, organizados por tipos de produtos. O turista é guiado para facilitar a criação do roteiro.
##### 3 - Roteiros personalizados
    A partir das informações do portal, os turistas também podem criar os próprios roteiros considerando suas preferências, localização geográfica e restrições de tempo e recursos. Dessa forma tem-se roteiros personalizados conforme sua necessidades.
##### 4 - Personalização do site
    É interessante que o layout do site possa ser personalizados conforme o turismo da região.
##### 5 - Busca de informações
    Através de palavras-chaves, pode-se realizar consultas que facilite e torne mais ágil para o turista nas tomadas de decisões.
##### 6 - Redes sociais
    O turista pode indicar atrativos ou empreendimentos em redes sociais, ampliando a capacidade do sistema.
##### 7 - Indicação
    O sistema possibilita indicar o site, com seu link e locais visitados.
##### 8 - Relatórios gerenciais
    O gestor do sistema deve receber relatórios qualitativos e quantitativos sobre os acessos de sua utilização, sugestões, locais turísticos, e outros, que possibilitem o acompanhamento do site. 
    Por exemplo com apoio do Google Analytics, o gestor do sistema poderá obter informações sobre cidades/país/continente do internauta, tempo de permanência no site, serviços mais utilizados, e outra informações que possam melhorar a navegação do turista.
##### 9 - Páginas web
    Prover páginas para os serviços catalogados com informações que facilitem sua utilização pelos turistas.
##### 10 - Outras features as serem identificadas

## Getting Started

* Clone this repository.
* Want to use TypeScript? Check out the `typescript` branch: `git checkout typescript`
* Run `npm install` from the project root.
* Install the ionic CLI (`npm install -g ionic@beta`)
* Run `ionic serve` in a terminal from the project root.
* Profit

**Note:** Build slow? Update `npm` to 3.x: `npm install -g npm`.


## File Structure of App

```
ionic-angular-firebase-partiu-app/
├── .github/                           * GitHub files
│   ├── CONTRIBUTING.md                * Documentation on contributing to this repo
│   └── ISSUE_TEMPLATE.md              * Template used to populate issues in this repo
|
├── app/                               * Working directory
│   ├── pages/                         * Contains all of our pages
│   │   │
│   ├── providers/                     * Contains all Injectables
│   │
│   ├── theme/                         * App theme files
│   │   ├── app.core.scss              * App Shared Sass Imports
│   │   ├── app.ios.scss               * iOS Sass Imports & Variables
│   │   ├── app.md.scss                * Material Design Sass Imports & Variables
│   │   ├── app.variables.scss         * App Shared Sass Variables
│   │   └── app.wp.scss                * Windows Sass Imports & Variables
│   │
│   ├── app.html                       * Application template
│   └── app.js                         * Main Application configuration
│
├── node_modules/                      * Node dependencies
|
├── platforms/                         * Cordova generated native platform code
|
├── plugins/                           * Cordova native plugins go
|
├── resources/                         * Images for splash screens and icons
|
├── www/                               * Folder that is copied over to platforms www directory
│   │   
│   ├── build/                         * Contains auto-generated compiled content
│   │     ├── css/                     * Compiled CSS
│   │     ├── fonts/                   * Copied Fonts
│   │     ├── js/                      * ES5 compiled JavaScript
│   │     ├── pages/                   * Copied html pages
│   │     └── app.html                 * Copied app entry point
│   │
│   ├── data/                          * Contains data used for the app
│   │     └── data.json                * App data
│   │
│   ├── img/                           * App images
│   │
│   └── index.html                     * Main entry point
|
├── .editorconfig                      * Defines coding styles between editors
├── .gitignore                         * Example git ignore file
├── config.xml                         * Cordova configuration file
├── ionic.config.json                  * Ionic configuration file
├── LICENSE                            * Apache License
├── package.json                       * Our javascript dependencies
└── README.md                          * This file
```
