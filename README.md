# Sequelize \#01 | Raw Queries

![Screenshot](https://raw.githubusercontent.com/Marcelo-Diament/sequelize-aula-01/main/backend/public/images/sequelize-aula-01.png)

Prática referente à aula de introdução ao Sequelize. Nessa prática iremos realizar as 4 etapas de um CRUD - criar um registro no Banco de Dados (C - _Create_), consultar um ou todos os registros (R - _Read_), atuaizar um registro (U - _Update_) e excluir um registro (D - _Delete_). Usaremos o Node.js como base, o Express como 'mini _framework_' para configurarmos nosso servidor (com ajuda do Express Generator), EJS como _template engine_ para nossas telas, Banco de Dados MySQL e o Sequelize, foco da prática, para nos conectarmos ao BD e manipularmos os registros com _Raw Queries_ (_queries_ 'puras').

## Como Usar o Repositório?

A ideia da prática é que consiga reproduzir esse projeto na sua própria máquina, do zero - seguindo as instruções desse repositório. Mas, caso queira baixar o repositório e 'rodar' em ambiente local, basta executar os seguintes passos:

1. Ativar o MySQL através do XAMPP

2. Ativar sua conexão (no caso com os dados `host: localhost`, `user: root`, `password: (vazia)`)

3. Criar um Banco de Dados MySQL chamado `aula_sequelize_01`

4. Criar uma tabela chamada `funcoes` com os campos `id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY` e `funcao VARCHAR(100) NOT NULL`.

5. Popular a tabela com os valores `Administrador` e `Usuário Final` (nessa ordem).

6. Criar uma tabela chamada `usuarios` com os campos `id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY`, `nome VARCHAR(100) NOT NULL`, `sobrenome VARCHAR(100) NOT NULL`,  `email VARCHAR(100) NOT NULL` e `id_funcao INT UNSIGNED` e criar a _contraint_ (_FK x PK_) (`CONSTRAINT fk_funcao_id FOREIGN KEY (id_funcao) REFERENCES funcoes(id)`).

7. Popular essa tabela com alguns registros (opcional, mas vale a pena para poder visualizar os usuários logo no início)

6. Garantir que possui o Express e o Nodemon instalados globalmente

7. Instalar as dependências do projeto e iniciar o servidor (via terminal)

``` sh
cd backend && npm install && npm run start
```

8. Abrir `localhost:3000` no seu navegador

As seguir há o detalhamento de cada etapa percorrida ao longo do projeto - inclusive as etapas mencionadas acima.

Faça bom proveito e esperamos que ajude em sua jornada de aprendizado! =)

## Introdução

Nesse repositório criaremos um projeto simples, onde poderemos criar, consultar, editar e excluir usuários a partir de um banco de dados MySQL.

### Objetivo

O intuito é entendermos como:

1. Conectar o backend (node.js) com um banco de dados

2. Realizar o CRUD (Create, Read, Update e Delete) através do Sequelize

3. Utilizarmos queries SQL puras para executarmos as ações (Raw Queries)

Embora o Sequelize tenha outras features mais bacanas, como usar os métodos do Sequelize e Models, iniciaremos pelo básico.

### Pré Requisitos

Para executar essa prática, precisaremos de:

1. VS Code (ou outra IDE) para trabalharmos nosso código

2. GitBash (ou outro terminal) para executarmos nossos comandos de instalação de pacotes

3. Banco de dados MySQL (sugerimos o download do XAMPP/LAMP/MAMP - de acordo com seu sistema operacional)

4. Um SGBD (Sistema de Gestão de Banco de Dados) - pode ser o Workbench ou o phpMyAdmin, por exemplo

5. Node.js instalado (verifique se está instalado com o comando de terminal `node -v`)

6. NPM (ou Yarn) instalado (verifique se está instalado com o comando de terminal `npm -v`)

### Tecnologias

**Linguagens**

Basicamente utilizaremos JavaScript, MySQL e Bash (comandos de terminal).

**Frameworks, Bibliotecas e Pacotes**

Para essa prática usaremos o Node.js como tecnologia de back end.

Para o servidor, utilizaremos o Express (e o pacote Express Generator para facilitar nossa vida).

Para a interface com o usuário, utilizaremos o EJS como template engine.

Para o banco de dados, seguiremos com MySQL como linguagem (e o pacote MySQL2) e utilizaremos o Sequelize (e o Sequelize-CLI como dependência para desenvolvimento) para manipular o banco a partir do back end.

Por fim, usaremos o pacote nodemon para que o servidor seja automaticamente atualizado a cada alteração em nosso código.

## Preset do Projeto

Alguns passos antes de iniciarmos.

### Banco de Dados

Como trabalharemos com um banco de dados MySQL, o primeiro passo é já criarmos nosso banco, uma tabela e incluir alguns registros.

Precisamos ativar a opção 'MySQL' no painel de controle do XAMPP para isso.

#### Criando o Banco de Dados

O primeiro passo é nos conectarmos pelo SGBD (usaremos o Workbench mas pode ser qualquer um). Nese passo é importante que já tome nota dos seus dados de conexão. Normalmente são:

> Host: 'localhost' OU '127.0.0.1' | Port: 3306 OU 3307 (Windows/Linux) OU 8888 OU 8889 (Mac) | User: 'root' | Senha: vazia (Windows/Linux) ou 'root' (Mac)

Esses dados são salvos quando realiza a conexão no SGBD e a porta é exibida no XAMPP também.

Então vamos executar o comando a seguir (através do Workbench, por exemplo) para criarmos o BD:

``` myqsl
CREATE DATABASE aula_sequelize_01;
```

Também precisamos 'usar' o banco:

``` mysql
USE aula_sequelize_01;
```

#### Criando a tabela funcoes

Vamos criar uma tabela dentro desse banco, vai se chamar `funcoes` :

``` mysql
CREATE TABLE funcoes (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    funcao VARCHAR(100) NOT NULL
);
```

#### Populando a tabela

``` mysql
INSERT INTO funcoes (funcao) VALUES ('Administrador'), ('Usuário Final');
```

#### Criando a tabela usuarios

Agora vamos criar uma tabela dentro desse banco, vai se chamar `usuarios` :

``` mysql
CREATE TABLE usuarios (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    id_funcao INT UNSIGNED,
	  CONSTRAINT fk_funcao_id FOREIGN KEY (id_funcao) REFERENCES funcoes(id)
);
```

Será uma tabela extremamente simples, apenas com os campos ID, Nome, Sobrenome e Email.

#### Populando a tabela

Por fim, incluiremos alguns usuários na tabela:

``` mysql
INSERT INTO usuarios (nome, sobrenome, email, id_funcao)
VALUES ('Marcelo','Diament','marcelo@diament.com.br',1),
('Henrique','Serra','henrique@diament.com.br',1),
('Wolfgang','Amadeus Mozart','wolfg@ngamadeusmoz.art',2),
('Ludwig','van Beethoven', 'ludv@nbeethov.en',2),
('Pyotr','Ilyich Tchaikovsky','tch@ikov.sky',2),
('Igor','Stravinsky', 'i.str@vins.sky',2),
('George','Friedrich Händel','h@ndel.com',2),
('Giacomo','Puccini', 'gi@puccini.com',2),
('Johannes','Brahms', 'br@hms.net',2),
('Antonio','Salieri', 'tonho@salieri.mus',2),
('Antonio','Vivaldi', 'vivaldi@gmail.com',2),
('Franz','Schubert', 'schubert@fra.nz',2),
('Johann','Sebastian Bach','johan@ba.ch',2),
('Frédéric','Chopin','fred@chop.in',2),
('Chiquinha','Gonzaga','chica@gonzaga.com',2),
('Heitor','Villa-Lobos','villa@lobos.com',2),
('Alfredo','da Rocha Viana Filho','pixinguinha@ig.com.br',2),
('Ary','Barroso','barroso.ary@terra.com.br',2),
('Angenor','de Oliveira,','cartola@live.com',2),
('Noel','Rosa','noel.rosa@outlook.com',2),
('João','Rubinato','adoni@ran-barbosa.com',2),
('Luiz','Gonzada','l.gonzada@gmail.com',2),
('Vinicius','de Moraes','poeta@ig.com.br',2),
('Lupicínio','Rodrigues','loop@live.com',2),
('Dorival','Caymmi','dori@val.com',2),
('Antônio Carlos','Jobim','tom@jobim.co',2),
('Antônio José','Santana Martins','tom@tomze.com.br',2),
('Baden','Powell','baden@powell.com.br',2),
('Roberto','Carlos','rei@rb.com.br',2),
('Erasmo','Carols','erasmo@carlos.com.br',2),
('Gilberto','Gil','gil@berto.com',2),
('Milton','Nascimento','miltinho@nascimento.com.br',2),
('Caetano','Veloso','caeto@veloso.com',2),
('Paulinho','da Viola','pdv@gmail.com',2),
('Sebastião','Rodrigues Maia','timm@ia.com.br',2),
('Chico','Buarque de Holanda','chico@buarque.com',2),
('Aldir','Blanc','aldir@blanc.com',2),
('João','Bosco','johnny@bosco.com',2),
('Alceu','Paiva Valença','alceu@valenca.com',2),
('Zé','Ramalho','ze@ramalho.com.br',2),
('Antonio','Pecci Filho','toquinho@gmail.com',2),
('Djavan','Caetano Viana','dj@van.com.br',2),
('Marisa','Monte','marisa@monte.com',2),
('Agenor','de Miranda Araújo Neto','cazuza@baraovermelho.com',2);
```

Podemos ainda executar um `SELECT` para vermos os registros inseridos:

``` mysql
SELECT usuarios.nome AS 'Nome',
    usuarios.sobrenome AS 'Sobrenome',
    usuarios.email AS 'Email',
    funcoes.funcao AS 'Função'
FROM usuarios
LEFT JOIN funcoes ON usuarios.id_funcao = funcoes.id;
```

### Dependências Globais

Não é obrigatório, mas já podemos deixar algumas dependências de forma global, para utilizarmos mais facilmente nos próximos projetos.

É importante lembrar que, caso queira deixar a dependência salva no `package.json` (arquivo responsável - também - por mapear as dependências do projeto), devemos instalar localmente, indicando a opção `--save` para salvar como dependência. Também podemos indicar como uma dependência de desenvolvimento passando a opção `-D` após `--save` .

#### Express Generator

Trata-se de um _boilerplate_ do Express, ou seja, esse pacote já cria um projeto estruturado de Express para nós. Para instalar devemos executar no terminal o seguinte comando:

``` sh
npm install express-generator -g
```

#### Nodemon

É um pacote que simplesmente observa as alterações no projeto e atualiza o servidor automaticamente (sem precisarmos 'derrubar' o servidor com o `Control + C` e reiniciarmos com `node arquivo.js` ). Comando para instalação:

``` sh
npm install -g nodemon
```

## Setup do Projeto

**Branch:** [feature/project-setup](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/project-setup)

Agora vamos, finalmente criar nosso projeto! =)

### Projeto Express com Express Generator

Nessa prática, faremos tudo através do Node.js, então não teremos front end. Vamos criar nossa pasta de backend utilizando o Express Generator, que acabamos de instalar globalmente. É bem simples, basta executarmos:

``` sh
express backend --view=ejs
```

O termo `express` chama o pacote que instalamos. `backend` é o nome do projeto Express, da pasta que será criada. E `--view=ejs` indica que a template engine que utilizaremos será o EJS.

Verá que a pasta `backend` foi criada já com uma série de arquivos dentro dela (caso tenha dúvidas em relação ao Express e ao Express Generator, consulte os repositórios específicos sobre esse tema, como [express-intro](https://github.com/Marcelo-Diament/express-intro) ou [express-generator](https://github.com/Marcelo-Diament/express-generator)). Sobre o EJS, há o repositório [template-engine-ejs](https://github.com/Marcelo-Diament/template-engine-ejs).

### Script Start

Agora vamos atualizar o _script_ `start` do arquivo `./backend/package.json` para usarmos o `nodemon` .

Nesse arquivo (dentro da pasta `./backend` ) vamos substituir o trecho `node` do _script_ `start` por `nodemon` . Ficará assim:

``` json
{
  "name": "backend",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "nodemon ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1"
  }
}
```

Dependendo de quando estiver realizando essa prática as versões das dependências podem mudar.

### Dependências do Projeto

Agora já vamos deixar instaladas as dependências. Dentro da pasta `backend` vamos instalar o pacote 'sequelize' e o pacote 'mysql2' de uma só vez:

``` sh
cd backend && npm install --save sequelize mysql2
```

E vamos instalar, também, a dependência de desenvolvimento 'sequelize-cli':

``` sh
npm install --save -D sequelize-cli
```

### Conectando o Banco de Dados

Bom, como é necessário criarmos a conexão com nosso banco de dados para podermos trabalhar com o Sequelize e o nosso BD (Banco de Dados) MySQL, vamos considerar a tarefa de preparar a conexão (não é a conexão em si) como parte do setup do projeto.

#### Config

Na pasta `./backend` vamos criar um arquivo `database.js` dentro de uma pasta que vamos criar também, chamada `config` . Faremos isso via terminal.

Considerando que já estamos dentro da pasta `./backend` no terminal, executaremos o seguinte comando:

``` sh
mkdir config && cd config && touch database.js && code database.js
```

Simplesmente estamos concatenando os comandos para 1. criar a pasta `config` , 2. acessar a pasta `config` , 3. criar o arquivo `database.js` e 4. abrir o arquivo `database.js` .

O arquivo `./backend/config/database.js` abrirá automaticamente. Então vamos incluir o seguinte código dentro dele:

``` js
const config = {
    username: 'root',
    password: '',
    database: 'aula_sequelize_01',
    host: 'localhost',
    dialect: 'mysql'
}

module.exports = config
```

Perceba que são aqueles mesmos dados de conexão que mencionamos anteriormente. Temos:

| Propriedade (chave) | Valor               | Descrição                          |
| ------------------- | ------------------- | ---------------------------------- |
| username            | 'root'              | Nome de usuário do BD              |
| password            | ''                  | Senha do BD (no caso, vazia)       |
| database            | 'aula_sequelize_01' | Nome do Banco de Dados que criamos |
| host                | 'localhost'         | Host (poderia ser '127.0.0.1')     |
| dialect             | 'mysql'             | Dialeto - usaremos o MySQL         |

> Atenção! Esses dados são dados sensíveis - devem estar no arquivo `.gitignore` do nosso repositório para não serem compartilhados com o mundo. Como se trata apenas de um exercício e de uma conexão local padrão, sem senha, nesse caso não tem problema.

Observação: poderíamos já exportar essas configurações sem criarmos uma `const` , isso é opcional - mas fica mais compreensível definindo uma `const` e dando um nome aos dados que estamos informando.

Agora que temos os dados necessários para a conexão, vamos criar um arquivo que de fato permite conectarmos nosso backend ao BD (mas ainda não é a conexão em si).

Vamos criar o arquivo `.sequelizerc` (um arquivo oculto, pois se inicia com ponto). Ele deve ser criado na pasta `./backend` .

``` sh
touch .sequelizerc && code .sequelizerc
```

Nesse arquivo, declararemos o seguinte trecho de código:

``` js
const path = require('path')

module.exports = {
    'config': path.resolve('config', 'database.js')
}
```

Estamos simplesmente declarando qual o caminho para o arquivo com os dados de conexão. O `path` nada mais faz do que unir as pastas do nosso caminho (como um `join` faria).

Por fim, criaremos uma pasta (em `./backend` ) chamada `database` (que será utilizada em práticas futuras).

## Página Inicial

**Branch:** [feature/homepage](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/homepage)

Antes de entrarmos nas telas de usuários, vamos apenas ajustar nossa Homepage. Dessa forma, já faremos uma revisão breve sobre os principais conceitos do Express, MVC (no caso apenas o V - View e o C - Controller) e EJS (template engine). Lembrando que grande parte do trabalho já foi feita pelo Express Generator.

### Revisão

**./backend/app.js**

Tudo começa no arquivo `./backend/app.js` . Referente exclusivamente à página inicial (ou _index_, Homepage), temos os seguintes _snippets_ (trechos de código):

``` js
// Importantdo a rota index
var indexRouter = require('./routes/index');

// Definindo que usaremos a rota index quando acessarem '/'
app.use('/', indexRouter);
```

**./backend/routes/index.js**

A rota index vem construída dessa maneira:

``` js
// Método get, que recebe a rota (a partir de onde ele é chamado) e um callback que recebe request, response e next
router.get('/', function(req, res, next) {

    // Aqui estamos pedindo para renderizar a view index (primeiro parâmetro) e enviar um objeto com a propriedade title e o valor Express
    res.render('index', {
        title: 'Express'
    });

});
```

Ou seja, ao acessarmos `localhost:3000` , chamamos a rota `index` , que renderiza a view `index` enviando `title` com o valor `Express` .

A porta 3000 da URL é definida em `var port = normalizePort(process.env. PORT || '3000'); ` , no arquivo `backend\bin\www` .

**backend\views\index.ejs**

Por fim, temos a view `index` , responsável por renderizar a tela que o usuário final visualiza (podendo receber propriedades através da rota - ou do _controller_ que criaremos em breve). O EJS (e outros template engines) lembram muito a sintaxe do HTML, mas nos permitem usar JS dentro do próprio HTML, através de uma sintaxe específica. No caso, usamos `<%= umObjeto.suaPropriedade %>` para renderizarmos algo a partir de objetos JS:

``` ejs
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
  </body>
</html>
```

**Visualizando nossa Página Inicial**

Primeiro precisamos garantir que todas as dependências sejam instaladas. Então, de dentro da pasta `./backend` , vamos executar:

``` sh
npm install
```

E, finalmente, para visualizarmos nossa página incial, precisamos iniciar nosso servidor. Precisamos executar o comando no terminal:

``` sh
npm run start
```

Isso vai chamar o _script_ `start` que definimos no `./backend/package.json` , que por sua vez chama o nodemon. A partir daí, qualquer alteração nos arquivos em `./backend` fará com que o servidor já atualize (ainda assim, precisamos atualizar a aba no navegador para vermos as atualizações).

Agora é só acessarmos o endereço `localhost:3000` para vermos nossa tela inicial! =)

### Controller

O Controller serve para gerenciar, controlar, o que deve acontecer entre o acesso à rota (_request_) e a resposta entregue na tela (_response_). Dessa forma conseguimos implantar regras de negócio de forma a isolar tal responsabilidade.

Começaremos criando uma pasta chamada `controllers` e um arquivo `index.js` dentro dela (_controller_ responsável pela rota `index` ). No terminal, executaremos (a partir da pasta `./backend` )

``` sh
mkdir controllers && cd controllers && touch index.js && code index.js
```

O _controller_ nada mais é do que um objeto JS com métodos a serem chamados de acordo com cada rota. Esse objeto deve ser exportado como um módulo. Nesse arquivo teremos a seguinte estrutura:

``` js
// Criamos o objeto controller
const controller = {
    // Definimos uma chave que corresponde ao método index, que por sua vez, tem como valor uma arrow function que recebe req, res e next
    index: (req, res, next) => {
        //Aqui estamos renderizando a view index e enviando as propriedades title e subtitle e seus respectivos valores
        res.render('index', {
            title: 'Página Inicial',
            subtitle: 'Bem vindo à prática de Sequelize #01!'
        });
    }
}

module.exports = controller
```

Nesse caso só estamos prevendo um método - `index` - que responde ao acesso à página inicial sob o método `GET` (por isso o método do Express utilizado na rota é o `get()` ).

### Atualização Rota index

Agora precisamos utilizar o _controller_ `index` na respectiva rota. Vamos importá-lo (com `require()` ) e atrelá-lo à rota para a página inicial ( `'/'` ) sob o método GET ( `get()` ). No final das contas, estamos apenas utilizando o método `index` do _controller_ como segundo parâmetro da rota. Então o arquivo `./backend/routes/index.js` fica assim (já com algumas alterações de escrita):

``` js
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/index')

router.get('/', controller.index)

module.exports = router
```

### Atualização da View index

E, para finalizarmos, vamos atualizar nossa _view_ `index` (em `./backend/views/index.ejs` ). Somente trocaremos a frase padrão pela propriedade `subtitle` que criamos no _controller_:

``` ejs
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p><%= subtitle %></p>
  </body>
</html>
```

Com isso finalizamos nossa página inicial!

Sim, está super simples - mas a ideia é partirmos logo para o Sequelize, e não criarmos um front bonito para a Homepage.

## Templates Parciais

**Branch:** [feature/partial-templates](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/partial-templates)

Um último passo antes de entrarmos na parte de usuários é isolarmos as _tags_ HTML `head` , `header` e `footer` como _templates_ parciais (ou _subtemplates_). Mas... por quê?

Como essas 3 _tags_ sempre se repetem, isolarmos elas e importarmos em cada _template_ faz muito mais sentido. Assim, evitamos códigos duplicados e só precisamos atualizar um trecho quando houver algum tipo de alteração.

São pouquíssimos passos, quase que um `Control + C` / `Control + V` .

### Pasta partials

O primeiro passo é criarmos a pasta `./backend/views/partials` (partindo já de `./backend` ):

``` sh
cd views && mkdir partials
```

Dentro dessa pasta criaremos os 3 arquivos:

``` sh
cd partials && touch head.ejs header.ejs footer.ejs
```

### Head, Header e Footer

Agora tudo o que temos que fazer é recortar cada trecho e colar no respectivo _subtemplate_. Mas... já que vamos mexer nisso, já vamos adicionar algumas classes (respeitando o padrão [BEM](http://getbem.com/naming/), onde organizamos os seletores por Bloco, Elemento e Modificador) para darmos um 'talento' nesse estilo.

Lembre-se de que não há um `header` nem um `footer` definido ainda, então vamos criar algo bem simples.

**./backend/views/partials/head.ejs**

Já vamos incluir a abertura da tag `body` também.

``` ejs
<!DOCTYPE html>
<html>

<head>
  <title><%= title %> | Sequelize #01</title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>

<body>
```

**./backend/views/partials/header.ejs**

Vamos usar um texto fixo como `h1` em nosso `header` .

``` ejs
<header class="header">
  <h1 class="header__title">Sequelize #01 | Raw Queries</h1>
</header>
```

**./backend/views/partials/footer.ejs**

No `footer` usaremos um texto fixo acompanhado do símbolo HTML de _copyright_ e do ano atual. Repare que estamos usando JS puro dentro da sintaxe de renderização do EJS. E fechamos o `body` .

``` ejs
<footer class="footer">
  <p class="footer__copy">Sequelize #01 - Raw Queries &copy; | <%= new Date().getFullYear() %></p>
</footer>
</body>

</html>
```

### Incluindo os Templates Parciais

Agora que temos nossos templates parciais prontos, precisamos inclui-los na _view_ `index` . Para isso usaremos a seguinte sintaxe: `<%- include('caminho-do-arquivo/a-partir-da-view-atual') %>` :

``` ejs
<%- include('partials/head') %>
<%- include('partials/header') %>
<h1><%= title %></h1>
<p><%= subtitle %></p>
<%- include('partials/footer') %>
```

E para nossa _homepage_ não ficar tão sem graça assim, vamos incrementar um pouquinho mais.

``` ejs
<%- include('partials/head') %>
<%- include('partials/header') %>
<main>
  <section class="main-section">
    <h2 class="main-section__title"><%= title %></h2>
    <h3 class="main-section__subtitle"><%= subtitle %></h3>
    <p class="main-section__description">Nesse repositório criaremos um projeto simples, onde poderemos criar, consultar, editar e excluir usuários a partir de um banco de dados MySQL.</p>
    <p class="main-section__description">O intuito é entendermos como conectar o backend (node.js) a um banco de dados, realizar o CRUD (Create, Read, Update e Delete) através do Sequelize e utilizarmos queries SQL puras para executarmos as ações (Raw Queries).</p>
    <p class="main-section__description">Embora o Sequelize tenha outras features mais bacanas, como usar os métodos do Sequelize e Models, iniciaremos pelo básico.</p>
  </section>
</main>
<%- include('partials/footer') %>
```

### Atualizando o Estilo

E pra finalizar essa _branch_, vamos atualizar o estilo geral das nossas páginas. O arquivo responsável pelo estilo é o `./backend/public/stylesheets/style.css` . Vamos criar algumas variáveis e aplicar um estilo simples usando as classes que já criamos. Ficará assim:

``` css
:root {
    --azul: #00B7FF;
    --branco: #fff;
    --chumbo: #3e3e3e;
    --cinza: #eee;
    --preto: #000;
}

body {
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

a {
    color: var(--azul);
    text-decoration: none;
}

.header,
.footer {
    background-color: var(--azul);
    color: var(--branco);
    margin: 0;
    max-height: 76px;
    min-height: 40px;
    padding: 16px;
    text-align: center;
    width: -webkit-fill-available;
}

.header__title {
    font-size: 16px;
}

.footer__title {
    font-size: 14px;
    font-weight: bolder;
}

main {
    min-height: calc(100vh - 180px);
    padding: 16px;
}

.main-section__title {
    font-size: 24px;
}

.main-section__subtitle {
    color: var(--chumbo);
    font-size: 20px;
}

.main-section__description {
    color: var(--chumbo);
    font-size: 16px;
}
```

## Usuários

**Branch:** [feature/users](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/users)

Agora que já possuimos uma _homepage_ e um singelo estilo aplicado a ela, vamos preparar os arquivos referentes a tela de usuários.

Faremos basicamente tudo o que fizemos com a Página Inicial, começando pela rota e seu _controller_.

### Rota users

No arquivo `./backend/routes/users.js` , vamos preparar a rota para a listagem dos usuários na _view_ `users` (considerando que cada usuário terá um Nome, Sobrenome e Email, conforme a tabela que criamos no nosso Banco de Dados).

``` js
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/users')

router.get('/', controller.list)

module.exports = router
```

### Controller users

Nesse momento, se estiver com o servidor 'rodando', verá que um erro é acusado. Isso ocorre por que ainda não criamos nosso _controller_ `users` . Faremos isso agora mesmo! Vamos criar o arquivo `./backend/controllers/users.js` e defini-lo dessa maneira:

``` js
const controller = {
        list: (req, res, next) => {
            res.render('users', {
                    title: 'Página de Usuários',
                    subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
                    usuarios: [{
                            {
                                id: 1,
                                name: 'Fulano',
                                lastName: 'de Tal',
                                email: 'fulano@detal.com',
                            },
                            {
                                id: 2,
                                name: 'Ciclano',
                                lastName: 'Tal Qual',
                                email: 'ciclano@talqual.com',
                            }
                        ]
                    })
            }
        }

        module.exports = controller
```

Verá que esse _controller_ é muito semelhante ao `index` . As únicas diferenças são:

* Dessa vez o nome do método que criamos é `list`

* Ao invés de renderizarmos a _view_ `index`, vamos renderizar a _view_ `users` (que ainda precisamos criar)

* Além de `title` e `subtitle`, estamos passando uma terceira propriedade, chamada `users`. Essa propriedade tem como valor um _array_ de objetos, sendo cada um dos objetos uma representação dos usuários (com Nome, Sobrenome e Email - `name`,  `lastName` e `email`).

Esses usuários passados por código (_hard coded_) serão substituídos pelos usuários do banco, em breve. Antes precisamos criar a nossa nova _view_ `users` .

### View users

Podemos duplicar o arquivo `./backend/views/index.ejs` e renomeá-lo como `users.ejs` .

Vamos apagar os parágrafos dentro da `main-section` e criar uma nova `section` com a classe `users` (que só aparecerá caso haja usuários enviados, senão deveremos mostrar uma mensagem dizendo que não há usuários cadastrados - usaremos uma condicional para criarmos essa condição).

Dentro dessa `section` , teremos uma `table` e, dentro dela, uma `tr` (_table row_) para cada usuário - mas faremos isso usando um _loop_, de forma que a _view_ mostre quantos usuários receber. Nossa _view_ ficará assim (por enquanto):

``` ejs
<%- include('partials/head') %>
<%- include('partials/header') %>
<main>
  <section class="main-section">
    <h2 class="main-section__title"><%= title %></h2>
    <h3 class="main-section__subtitle"><%= subtitle %></h3>
  </section>
  <% if(users && users.length > 0) { %>
  <section class="users">
    <table class="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Email</th>
          <th>Função</th>
        </tr>
      </thead>
      <tbody>
        <% for(let user of users) { %>
        <tr id="user<%= user.id %>" class="user">
          <td class="user__id"><%=user.id%></td>
          <td class="user__name"><%= user.name %></td>
          <td class="user__lastname"><%= user.lastName %></td>
          <td class="user__email"><%= user.email %></td>
          <td class="user__function"><%= user.id_funcao === 1 ? 'Admin' : 'Usuário Final' %></td>
        </tr>
        <% } %>
      </tbody>
    </table>
  </section>
  <% } else { %>
  <section>
    <h3>Ops... não há usuários cadastrados no banco de dados</h3>
  </section>
  <% } %>
</main>
<%- include('partials/footer') %>
```

Ok. Mas... agora nossa _view_ está poluída novamente! Então vamos criar um _template_ parcial apenas para a listagem de usuários.

Tudo o que precisamos fazer é mover o trecho referente à listagem de usuários para um arquivo `./backend/views/partials/users.ejs` e incluirmos o template parcial na _view_ de usuários. Teremos os arquivos assim:

**./backend/views/users.ejs**

``` ejs
<%- include('partials/head') %>
<%- include('partials/header') %>
<main>
  <section class="main-section">
    <h2 class="main-section__title"><%= title %></h2>
    <h3 class="main-section__subtitle"><%= subtitle %></h3>
  </section>
  <% if(users && users.length > 0) { %>
  <%- include('partials/users') %>
  <% } else { %>
  <section>
    <h3>Ops... não há usuários cadastrados no banco de dados</h3>
  </section>
  <% } %>
</main>
<%- include('partials/footer') %>
```

**./backend/views/partials/users.ejs**

``` ejs
<section class="users">
  <table class="users-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Sobrenome</th>
        <th>Email</th>
        <th>Função</th>
      </tr>
    </thead>
    <tbody>
      <% for(let user of users) { %>
      <tr id="user<%= user.id %>" class="user">
        <td class="user__id"><%= user.id %></td>
        <td class="user__name"><%= user.name %></td>
        <td class="user__lastname"><%= user.lastName %></td>
        <td class="user__email"><%= user.email %></td>
        <td class="user__function"><%= user.id_funcao === 1 ? 'Admin' : 'Usuário Final' %></td>
      </tr>
      <% } %>
    </tbody>
  </table>
</section>
```

### Estilo Listagem users

E precisamos estilizar essa nossa tabela, concorda? Podemos acrescentar o seguinte estilo ao nosso `./backend/public/stylesheets/style.css` :

``` css
.users-table {
    font-weight: bold;
    margin: 16px auto;
}

.users-table thead {
    background-color: var(--azul);
    color: var(--branco);
}

.users-table th,
.users-table td {
    padding: 6px 12px;
}
```

## Leitura de Usuários do Banco

**Branch:** [feature/read-db-users](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/read-db-users)

Vamos realizar nossa primeira consulta no Banco de Dados - vamos **ler** os usuários cadastrados (o **C** do **CRUD**)!

Toda a mágica vai acontecer no _controller_ de usuários. Vamos lá!

### Importando os Dados para Conexão com o BD

Logo no início do arquivo `./backend/controllers/users.js` , vamos importar o módulo do Sequelize e os dados de acesso ao banco:

``` js
const Sequelize = require('sequelize'),
    config = require('../config/database')
```

### Conectando com o DB

Na sequência da `const config` , definiremos a nossa conexão, chamando-a de `db` :

``` js
db = new Sequelize(config)
```

Estamos instanciando a classe Sequelize e passando os dados de conexão como argumento.

### Atualizando o Controller

Agora podemos remover nosso _array_ de objetos de usuários _hard coded_ e trocarmos pelos usuários do banco.

Vamos criar a nossa _raw query_ (ou seja, nossa consulta em 'SQL puro') e passar o retorno da _query_ para o objeto enviado à _view_.

> Importante! Como se trata de uma consulta, ela pode demorar um pouco para retornar, por isso usaremos uma fução assíncrona e aplicaremos o `await` para aguardarmos o retorno de nossa consulta.

``` js
list: async (req, res, next) => {
    // No trecho abaixo, acessamos o método query e passamos a query em si como argumento 1 e um objeto de opções no argumento 2, informanto o tipo de query que estamos utilizando - no caso um select
    const users = await db.query('SELECT * from usuarios', {
        type: Sequelize.QueryTypes.SELECT
    })
    res.render('users', {
        title: 'Página de Usuários',
        subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
        users
    })
}
```

### Atualizando a View

Como estávamos usando os nomes das propriedades em inglês, precisamos atualizar nossa _partial view_ `users` , atualizando o nome das propriedades (colunas da tabela `usuarios` ) para português. Basta atualizarmos as chaves/propriedades `name` para `nome` e `lastName` para `sobrenome` .

## Leitura de Usuário do Banco

**Branch:** [feature/read-db-user](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/read-db-user)

Faremos um segundo `SELECT` no nosso BD, mas dessa vez, de um usuário específico. Para isso vamos:

1. Criar um novo método no nosso _controller_

2. Criar uma nova rota em `users`, que receberá o parâmetro `:id` (o qual servirá para selecionarmos nosso usuário)

Em relação à _view_, manteremos ela como está (por essa razão, por mais que recebamos apenas um usuário, manteremos a estrutura de `users` no retorno/_response_ do _controller_).

### Método index do Controller de Usuários

Vamos incluir o método `index` no nosso _controller_. Será bem semelhante ao anterior, mas teremos a cláusula `WHERE` em nossa `query` .

Veremos 3 formas de utilizarmos o parâmetro `id` (recebido na _request_) em nossa _query_.

**Usando interpolação**

Basicamente estamos considerando que receberemos o parâmetro `id` a partir da _request_ da rota ( `req.params.id` ). Caso queira saber mais sobre as rotas no Express, acesse [esse repositório](https://github.com/Marcelo-Diament/express-roteamento).

Como manteremos a propriedade `users` nas propriedades retornadas à _view_, precisamos atribuir o valor capturado em `user`

``` js
const controller = {
    list: async (req, res, next) => {
        const users = await db.query('SELECT * from usuarios', {
            type: Sequelize.QueryTypes.SELECT
        })
        res.render('users', {
            title: 'Página de Usuários',
            subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
            users
        })
    },
    index: async (req, res, next) => {
        const user = await db.query(`SELECT * from usuarios WHERE usuarios.id = ${req.params.id}`, {
            type: Sequelize.QueryTypes.SELECT
        })
        res.render('users', {
            title: 'Página de Usuário',
            subtitle: 'Confira a seguir o usuário encontrado em nosso banco de dados',
            users: user
        })
    }
}
```

**Utilizando replacement com array**

No trecho referente à _query_, especificamente, poderíamos marcar o local de um ou mais parâmetros recebidos com `?` e definir o valor desses parâmetros através de um _array_ passando dentro a propriedade `replacements` , dentro das `options` (segundo parâmetro do método `query()` ).

Nesse caso, cada `?` será substituído pelo índice do _array_ correspondente. No caso temos apenas um parâmetro - então o primeiro parâmetro será substituído pelo valor do índice 0 do _array_:

``` js
let {
    id
} = req.params
const result = await db.query(`SELECT * from usuarios WHERE usuarios.id = ?`, {
    replacements: [
        id
    ],
    type: Sequelize.QueryTypes.SELECT
})
```

**Utilizando replacement com objeto**

A terceira forma seria passando o valor diretamente em um objeto, bem semelhante ao método anterior - mas ao invés de marcarmos o parâmetro com `?` , indicamos o nome do parâmetro na _query_, do mesmo jeito que fazemos na rota ( `:id` ):

``` js
let {
    id
} = req.params
const usuario = await db.query(`SELECT * from usuarios WHERE usuarios.id = :id`, {
    replacements: {
        id
    },
    type: Sequelize.QueryTypes.SELECT
})
```

### Adição de Rota

Por fim, precisamos criar uma rota que receba o parâmetro `id` e retorne o novo método criado ( `index` ) do nosso _controller_:

``` js
router.get('/:id', controller.index)
```

Simples assim! Apenas duas observações:

* Como já sabemos, a sintaxe para indicar a presença de um parâmetro é `:nomeDoParametro`, no caso `:id`. Através desse nome que acessaremos o parâmetro vindo na _request_ (`req.params.nomeDoParametro`)

* Repare que, como o arquivo da rota de usuários já foi chamado dentro da rota `users` (lá no arquivo `./backend/app.js` - `app.use('/users', usersRouter)`), não devemos repetir esse trecho `/users` no método `get()` de `router`.

Agora basta acessar `localhost:3000/users/1` (sendo 1 o ID do usuário a ser buscado) para visualizar o retorno da consulta ao BD. Se buscar por um ID inexistente, receberá a mensagem definida na condicional que checa se há usuários ou não. Podemos, inclusive, alterar o texto da mensagem para que faça mais sentido. =)

## Adição de Usuário ao Banco

**Branch:** [feature/add-user](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/add-user)

Beleza! Já conseguimos ler um ou todos os usuários do nosso Banco de Dados! Agora vamos ver como fazer para adicionarmos um novo usuário (letra C, de _Create_, do CRUD).

Nessa prática faremos o seguinte:

1. Vamos criar um formulário de cadastro (dentro da própria _view_ `users`, só para facilitar a prática e focarmos no Sequelize)

2. Vamos preparar um novo método (`add`) no nosso _controller_

3. Vamos criar uma rota específica, com o mesmo _path_ `/` (que representa, dentro do arquivo `./backend/routes/users.js`, `localhost:3000/users`) - mas agora com o método `post`.

Por padrão, o método `PATCH` permitiria adicionarmos ou editarmos um usuário. Mas vamos usar o `POST` para termos cada etapa do CRUD separada.

### Formulário de Cadastro de Usuário

**Partial View**

Vamos criar o arquivo `./backend/views/partials/userRegister.ejs` (a partir da pasta `./backend` ) e abrir na IDE:

``` sh
touch views/partials/userRegister.ejs && code views/partials/userRegister.ejs
```

Dentro dessa _partial view_ vamos criar um formulário bem simples:

``` ejs
<section id="addUserSection" class="register-user">
  <h2 class="register-user__title">Cadastro de Usuário</h2>
  <h3 class="register-user__subtitle">Preencha o formulário a seguir e clique em 'Adicionar Usuário'</h3>
  <form action="" method="POST" class="form">
    <div class="form__input-container">
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" required placeholder="Benedito">
    </div>
    <div class="form__input-container">
      <label for="sobrenome">Sobrenome</label>
      <input type="text" name="sobrenome" id="sobrenome" required placeholder="Calixto">
    </div>
    <div class="form__input-container">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required placeholder="bene@dito.com">
    </div>
    <div class="form__btns">
      <button>Adicionar Usuário</button>
    </div>
  </form>
</section>
```

Perceba que o atributo `action` está vazio. E o método declarado é o `POST` . Ou seja, os dados serão enviados para `localhost:3000/users` com o método `POST` .

**Include na View users**

Agora vamos incluir o formulário na _view_ `users` - mas só se estivermos na listagem de usuários (para isso usaremos uma condição checando se o `length` de `users` é maior que 1 ou é igual a 0, para quando não houver usuários retornados).

``` ejs
<% if((users && users.length > 1) || !users || users.length === 0) { %>
  <%- include('partials/userRegister') %>
<% } %>
```

**Estilo do Formulário**

Agora vamos adicionar mais um trecho ao nosso estilo:

``` css
.register-user {
    display: block;
    margin: 16px auto;
}

.register-user__title {
    font-size: 24px;
}

.register-user__subtitle {
    color: var(--chumbo);
    font-size: 20px;
}

.register-user .form {
    margin: 24px auto;
    min-width: max-content;
    width: 25vw;
}

.register-user .form__input-container {
    display: block;
    margin: 16px auto;
}

.register-user .form__input-container label {
    color: var(--chumbo);
}

.register-user .form__input-container input {
    padding: 4px 8px;
    width: -webkit-fill-available;
}

.form__btns {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
}

.form__btns button {
    background-color: var(--azul);
    border: none;
    color: var(--branco);
    display: inline-block;
    font-weight: bolder;
    text-align: center;
    margin: 8px 0;
    padding: 8px 16px;
}

.form__btns button:hover {
    background-color: var(--chumbo);
    color: var(--branco);
    cursor: pointer;
}
```

E, aproveitando, vamos aumentar a margem vertical da tabela de usuários para `24px` :

``` css
.users-table {
    font-weight: bold;
    margin: 24px auto;
}
```

### Controller de Cadastro de Usuário

Com o 'front' pronto, vamos preparar nosso _controller_! :)

Sabemos que nosso formulário está pronto para enviar os dados via `POST` . Também sabemos que as informações chegarão no `body` da nossa _request_ (que pode ser acessado com `req.body` ).

Então vamos usar a desestruturação para capturarmos cada um dos valores dos _inputs_, montarmos nossa _query_, ajustarmos o `type` da _query_ Sequelize para `INSERT` e usarmos o `replacement` com objeto para passaros os valores vindos do formulário para a _query_.

Nosso método vai se chamar `add` (consideraremos que todo usuário com email `@diament.com.br` é administrador):

``` js
add: async (req, res, next) => {
    const {
        nome,
        sobrenome,
        email
    } = req.body
    const id_funcao = email.indexOf('@diament.com.br') > 0 ? 1 : 2
    const user = await db.query(`INSERT INTO usuarios (nome, sobrenome, email, id_funcao) VALUES (:nome, :sobrenome, :email, :id_funcao)`, {
        replacements: {
            nome,
            sobrenome,
            email,
            id_funcao
        },
        type: Sequelize.QueryTypes.INSERT
    })
    if (user) {
        res.redirect('/users')
    } else {
        res.status(500).send('Ops... Algo de errado não deu certo!')
    }
}
```

No final da _query_, verificamos se a variável `user` foi salva (se foi, é por que o usuário foi inserido - então usamos o método `redirect()` passando o caminho `users` como argumento). Caso não seja salva, retornamos um erro com status `500` (erro de servidor).

Poderíamos ter mais validações, como checar cada parâmetro do usuário e criar erros de acordo com cada um deles. Mas como já deixamos todos os campos como obrigatórios e estamos usando o atributo `type` para garantir que o email seja um email de fato, não vamos nos aprofundar na validação (que também pode ser feita via JS diretamente no front end).

### Rota de Cadastro de Usuário

Agora só precisamos criar uma rota com o caminho `users` , com o método `post` e usando o método `add` do _controller_ `users` , super fácil:

``` js
router.post('/', controller.add)
```

Simples assim! Agora é só preencher o formulário e ver seu usuário sendo adicionado (lembre-se de que o MySQL deve ter sido ativado pelo XAMPP).

## Remoção de Usuário do Banco

**Branch:** [feature/remove-user](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/remove-user)

Vimos como adicionar um usuário, consultar um ou todos os usuários e agora veremos como apagar um usuário a partir de seu ID (D do CRUD, de _Delete_).

### View

**Atualizar Listagem de Usuário**

Vamos acrescentar um botão 'Excluir' na linha de cada usuário (na tabela de usuários). E precisaremos adicionar uma coluna à tabela também. Essa tarefa é bem tranquila, no arquivo `./backend\views\partials\users.ejs` faremos o seguinte (nesses trechos específicos):

**Dentro da tag `thead` > `tr` , na última posição**

``` ejs
<th>Excluir</th>
```

**Dentro da tag `tbody` > `tr` , na última posição**

``` ejs
<td class="user__delete">
  <form action="/users/<%= user.id %>/delete" method="POST">
    <button class="user__delete--btn">Excluir</button>
  </form>
</td>
```

Poderíamos usar o atributo `onclick` e chamar uma função de algum _script_, mas - para melhor compreensão - teremos esse formulário dentro do _table data_ (_tag_ `td` ).

> Importante: formulários HTML5 só aceitam os métodos `GET` e `POST` , então não conseguimos enviar através do método `DELETE` diretamente. Poderíamos enviar o método `DELETE` através de um `fetch` , por exemplo. Mas será mais simples enviarmos para uma rota com um caminho distinto, como veremos a seguir (logo, o método utilizado será o `POST` ).

### Rota de Exclusão de Usuário

Bom, já sabemos que não poderemos usar o método `delete()` . Então criaremos a seguinte rota (já considerando um método `delete` no nosso _controller_ de usuários):

``` js
router.post('/:id/delete', controller.delete)
```

Nós até poderíamos direcionar da rota com `POST` para a rota com `DELETE` , mas não faria muito sentido nessa prática.

### Controller de Exclusão de Usuário

Agora precisamos fazer a exclusão ocorrer de fato. Mas é praticamente o que já fizemos (trocando o método/ `type` para `DELETE` - e, na validação, verificamos se não há `user` ):

``` js
delete: async (req, res, next) => {
    const user = await db.query(`DELETE from usuarios WHERE usuarios.id = :id`, {
        replacements: {
            id: req.params.id
        },
        type: Sequelize.QueryTypes.DELETE
    })
    if (!user) {
        res.redirect('/users')
    } else {
        res.status(500).send('Ops... Algo de errado não deu certo!')
    }
}
```

### Estilo Botão Excluir

Com tudo já funcionando certinho, vamos apenas melhorar o estilo desse botão.

Vamos adicionar a variável `vermelho` dentro do seletor `:root` ( `--vermelho: #ff0055; ` ) e incluir o seguinte estilo (no final dos seletores que se referem à tabela de usuários):

``` css
.users-table .user__delete--btn {
    background-color: var(--vermelho);
    border: none;
    color: var(--branco);
    display: inline-block;
    font-weight: bolder;
    text-align: center;
    margin: auto;
    padding: 6px 12px;
}

.users-table .user__delete--btn:hover {
    background-color: var(--chumbo);
    color: var(--vermelho);
    cursor: pointer;
}
```

Prontinho! Podemos partir para a edição de usuário!

## Edição de Usuário no Banco

**Branch:** [feature/edit-user](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/edit-user)

Chegamos na última letra do CRUD - U, de _Update_!

Vamos racioncinar juntos para entender o que deve ser feito:

1. Já temos uma rota que lista um usuário único por ID. Beleza.

2. Também sabemos como adicionar as informações de um usuário, o método `add` do nosso _controller_.

3. Já conhecemos a _query_ SQL para alterarmos um usuário - `UPDATE usuarios SET nome = :nome, sobrenome = :sobrenome, email = :email WHERE usuarios.id = :id`. Isso, claro, se formos alterar todos os dados. Mas... concorda que é mais fácil capturar os dados originais e enviar todos novamente do que validar qual(is) campo(s) foi(ram) alterado(s), montar a _query_ com base nesse(s) campos, etc.?

Bom, o que precisamos fazer, então, é basicamente selecionar um usuário e editar suas informações, enviando todos os campos (partindo dos campos originais e permitindo o usuário a alterar os campos que desejar). Faz sentido?

Claro que há outras maneiras de executarmos essa tarefa, mas seguiremos o plano descrito acima. ; )

### View

Vamos atualizar a _view_ `./backend/views/partials/users` , incluindo um formulário de edição que só deve aparecer caso estejamos no 'detalhe' do usuário ( `users.length === 1` ):

``` ejs
<%
  if(users && users.length === 1) {
  user = users[0]
%>
<section id="editUserSection" class="edit-user">
  <h2 class="edit-user__title">Edição de Usuário</h2>
  <h3 class="edit-user__subtitle">Preencha o formulário a seguir e clique em 'Editar Usuário'</h3>
  <form action="" method="POST" class="form">
    <div class="form__input-container">
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" required value="<%= user.nome %>">
    </div>
    <div class="form__input-container">
      <label for="sobrenome">Sobrenome</label>
      <input type="text" name="sobrenome" id="sobrenome" required value="<%= user.sobrenome %>">
    </div>
    <div class="form__input-container">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required value="<%= user.email %>">
    </div>
    <div class="form__btns">
      <button>Editar Usuário</button>
    </div>
  </form>
</section>
<% } %>
```

Para otimizarmos nosso código, ao invés de declararmos sempre o índice 0 - pois só há um usuário nesse contexto -, salvamos esse índice (usuário) numa variável chamada `user` .

E, claro, também vamos adicionar um botão 'Editar' também:

**Coluna de `thead` > `tr` **

``` ejs
<th>Editar</th>
```

**Célula em `tbody` > `tr` (antes de 'Excluir')**

``` ejs
<td class="user__edit">
  <form action="/users/<%= user.id %>" method="GET">
    <button class="user__edit--btn">Editar</button>
  </form>
</td>
```

### Controller

Bom, tudo o que precisamos fazer é criar a nossa _query_ de alteração, seguindo o mesmo esquema das demais.

Capturamos os dados do formulário via `req.body` (desestruturando as propriedades) e o `id` por `req, params.id` , trocamos o método/ `type` e incluímos nossa _query_:

``` js
update: async (req, res, next) => {
    const {
        nome,
        sobrenome,
        email
    } = req.body
    let {
        id
    } = req.params
    const user = await db.query(`UPDATE usuarios SET nome = :nome, sobrenome = :sobrenome, email = :email WHERE usuarios.id = :id`, {
        replacements: {
            id,
            nome,
            sobrenome,
            email
        },
        type: Sequelize.QueryTypes.UPDATE
    })
    if (user) {
        res.redirect(`/users`)
    } else {
        res.status(500).send('Ops... Algo de errado não deu certo!')
    }
}
```

Observação: poderíamos direcionar o usuário para a visualização do próprio perfil, adicionando o `id` ao caminho ( `path` ) do `redirect()` . Mas, como estamos tratando da mesma tela (exatamente), isso prejudicaria a experiência do nosso usuário (ele pode achar que não houve atualização).

### Rota de Edição do Usuário

Mais do mesmo né! Bora criar essa rota!

``` js
router.post('/:id', controller.update)
```

 É a mesma rota da visualização de um usuário único, mas com o método `POST` (e com o método do _controller_ `update` ).

### Estilo do Botão  e Formulário de Edição

 Por fim, vamos estilizar nosso botão 'Editar'. Porém, como o estilo é muito parecido com o de 'Excluir', vamos reaproveitar as propriedades em comum. Nosso estilo (referente a esses botões) ficará assim:

``` css
 .users-table [class*="--btn"] {
     border: none;
     display: inline-block;
     font-weight: bolder;
     text-align: center;
     margin: auto;
     padding: 6px 12px;
 }

 .users-table [class*="--btn"]:hover {
     cursor: pointer;
 }

 .users-table .user__edit--btn {
     background-color: var(--amarelo);
     color: var(--chumbo);
 }

 .users-table .user__edit--btn:hover {
     background-color: var(--chumbo);
     color: var(--amarelo);
 }

 .users-table .user__delete--btn {
     background-color: var(--vermelho);
     color: var(--branco);
 }

 .users-table .user__delete--btn:hover {
     background-color: var(--chumbo);
     color: var(--vermelho);
 }
```

Isolamos o que é específico do botão 'Editar' e 'Excluir' (cores) e utilizamos um seletor mais genérico para aplicarmos as propriedades em comum entre eles.

Também precisamos aplicar um estilo ao formulário de edição. Poderíamos fazer da mesma maneira, mas só pra não nos 'habiutarmos' com um caminho único, vamos adicionar o seletor do formulário de edição aos seletores do formulário de cadastro:

``` css
.register-user,
.edit-user {
    display: block;
    margin: 16px auto;
}

.register-user__title,
.edit-user__title {
    font-size: 24px;
}

.register-user__subtitle,
.edit-user__subtitle {
    color: var(--chumbo);
    font-size: 20px;
}

.register-user .form,
.edit-user .form {
    margin: 24px auto;
    min-width: max-content;
    width: 25vw;
}

.register-user .form__input-container,
.edit-user .form__input-container {
    display: block;
    margin: 16px auto;
}

.register-user .form__input-container label,
.edit-user .form__input-container label {
    color: var(--chumbo);
}

.register-user .form__input-container input,
.edit-user .form__input-container input {
    padding: 4px 8px;
    width: -webkit-fill-available;
}
```

## Melhorias

**Branch:** [feature/improvements](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/improvements)

### Botão 'Ver'

Já temos o botão 'Editar' e 'Excluir' para cada usuário. Vamos adicionar também o botão 'Ver'.

**Views**

No _template_ parcial `users` , vamos incluir o botão antes do botão 'Editar' (e no `thead` > `tr` também):

** `tbody` > `tr` **

``` ejs
<td class="user__see">
  <form action="/users/<%= user.id %>" method="GET">
    <button class="user__see--btn">Ver</button>
  </form>
</td>
```

** `thead` > `tr` **

``` ejs
<th>Ver</th>
```

**Estilo**

E, claro, não podemos nos esquecer de seu estilo:

``` css
.users-table .user__see--btn {
    background-color: var(--azul);
    color: var(--branco);
}

.users-table .user__see--btn:hover {
    background-color: var(--chumbo);
    color: var(--azul);
}
```

**Dinâmica**

Já que essa _branch_ trata de melhorias, vamos melhorar esse esquema! A ideia é: quando estivermos editando um usuário, não precisamos visualizar o botão 'Editar'. E quando estamos vendo os detalhes do usuário, não precisamos do botão 'Ver'.

No entanto, estamos usando a mesma _view_. Claro que poderíamos ter outras rotas (ou usar o `fetch` para diferenciarmos o _controller_ de acordo com o método da rota). Mas... a ideia aqui é explorar os recursos básicos, então vamos aprender a capturar os _query params_ (aqueles pares de chave e valor enviado através da URL, após o `?` , por exemplo: `google.com?utm_source=instagram&utm_campaign=natal` ). Bora codar!

**Métodos do Controller**

Vamos incluir a propriedade `edit` no retorno dos métodos `list` e `index` do _controller_ `users` . No método `list` o valor sempre será `false` (mas precisamos passá-lo pois usamos a mesma _view_). Já no método `index` , vamos verificar se recebemos o _query param_ `edit` com o valor `edit` . Se for verdadeira, consideramos que é uma tela de edição, senão, é a tela de visualização.

Para capturarmos esse _query param_ basta acessarmos `req.query` e acessarmos o nome dele (no caso, `req.query.edit` ). Então verificamos se seu valor é igual a `edit` (poderia ser outro valor).

``` js
const controller = {
    list: async (req, res, next) => {
        const users = await db.query('SELECT * from usuarios', {
            type: Sequelize.QueryTypes.SELECT
        })
        res.render('users', {
            title: 'Página de Usuários',
            subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
            users,
            edit: false
        })
    },
    index: async (req, res, next) => {
        const user = await db.query(`SELECT * from usuarios WHERE usuarios.id = ${req.params.id}`, {
            type: Sequelize.QueryTypes.SELECT
        })
        req.query.edit === 'edit' ?
            res.render('users', {
                title: 'Página de Edição o Usuário',
                subtitle: 'Preencha o formulário para editar seu usuário',
                users: user,
                edit: true
            }) :
            res.render('users', {
                title: 'Página do Usuário',
                subtitle: 'Confira a seguir o usuário encontrado em nosso banco de dados',
                users: user,
                edit: false
            })
    }
}
```

_No trecho acima ignoramos o restante do código do arquivo `./backend/controllers/users.js` ._

**Condicionais na _view_**

Para finalizar essa melhoria, vamos incluir algumas condicionais para definirmos se o formulário de edição deve aparecer ou não - bem como quando os botões 'Ver' e 'Editar' devem aparecer. O botão 'Ver' só não aparecerá quando estivermos visualizando os detalhes do usuário. E o botão 'Editar' não deverá aparecer quando estivermos editando um usuário.

E, claro - precisamos incluir o _query param_ `edit=edit` no botão de editar, para que tudo isso funcione corretamente!

Detalhe importante: sempre que enviamos informações via método `GET` , os atributos `name` e `value` formam os pares de chave/valor do _query param_ - por isso acrescentamos um `input` do tipo `hidden` no formulário de edição (de forma a aumentarmos a quantidade de conhecimento aplicada nessa prática única). ; )

Enfim, nosso _template_ parcial `users` ficou assim:

``` ejs
<section class="users">
  <table class="users-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Sobrenome</th>
        <th>Email</th>
        <th>Função</th>
        <% if ((edit === true && users.length === 1) || users.length > 1 ) { %>
        <th>Ver</th>
        <% } %>
        <% if (edit === false) { %>
        <th>Editar</th>
        <% } %>
        <th>Excluir</th>
      </tr>
    </thead>
    <tbody>
      <% for(let user of users) { %>
      <tr id="user<%= user.id %>" class="user">
        <td class="user__id"><%=user.id%></td>
        <td class="user__name"><%= user.nome %></td>
        <td class="user__lastname"><%= user.sobrenome %></td>
        <td class="user__email"><%= user.email %></td>
        <td class="user__function"><%= user.id_funcao === 1 ? 'Admin' : 'Usuário Final' %></td>
        <% if ((edit === true && users.length === 1) || users.length > 1 ) { %>
        <td class="user__see">
          <form action="/users/<%= user.id %>" method="GET">
            <button class="user__see--btn">Ver</button>
          </form>
        </td>
        <% } %>
        <% if (edit === false) { %>
        <td class="user__edit">
          <form action="/users/<%= user.id %>" method="GET">
            <input type="hidden" name="edit" value="edit">
            <button class="user__edit--btn">Editar</button>
          </form>
        </td>
        <% } %>
        <td class="user__delete">
          <form action="/users/<%= user.id %>/delete" method="POST">
            <button class="user__delete--btn">Excluir</button>
          </form>
        </td>
      </tr>
      <% } %>
    </tbody>
  </table>
</section>
<% if(users && users.length === 1 && edit && edit === true) {
  user = users[0]
%>
<section id="editUserSection" class="edit-user">
  <form action="" method="POST" class="form">
    <div class="form__input-container">
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" required value="<%= user.nome %>">
    </div>
    <div class="form__input-container">
      <label for="sobrenome">Sobrenome</label>
      <input type="text" name="sobrenome" id="sobrenome" required value="<%= user.sobrenome %>">
    </div>
    <div class="form__input-container">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required value="<%= user.email %>">
    </div>
    <div class="form__btns">
      <button>Editar Usuário</button>
    </div>
  </form>
</section>
<% } %>
```

### Isolando o Formulário de Edição

Simplesmente iremos mover o formulário de edição de usuário para um _template_ parcial próprio.

**`./backend/views/partials/users.ejs`**

``` ejs
<% if(users && users.length === 1 && edit && edit === true) {
  user = users[0]
%>
<%- include('userEdit.ejs') %>
<% } %>
```

Como já estamos dentro da pasta `partials` , não devemos declará-la novamente.

**`./backend/views/partials/userRegister.ejs`**

``` ejs
<section id="editUserSection" class="edit-user">
  <form action="" method="POST" class="form">
    <div class="form__input-container">
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" required value="<%= user.nome %>">
    </div>
    <div class="form__input-container">
      <label for="sobrenome">Sobrenome</label>
      <input type="text" name="sobrenome" id="sobrenome" required value="<%= user.sobrenome %>">
    </div>
    <div class="form__input-container">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required value="<%= user.email %>">
    </div>
    <div class="form__btns">
      <button>Editar Usuário</button>
    </div>
  </form>
</section>
```

Dessa forma nosso código fica mais limpo, legível e organizado.

Com isso finalizamos as principais etapas da nossa prática!

## Desafio!

Há muita coisa que ainda pode ser melhorada nesse repositório - como inclusão de um botão 'Voltar', inclusão de links em um menu...

E aí? Topa essa desafio?

___

## Melhorias

A seguir, mais alguns _steps_ para implantação de melhorias opcionais (não fazem mais parte da prática, mas vale realizá-las também).

### Botão CTA Usuários

Vamos criar um botão (link) CTA (Call To Action) para levarmos o visitante da página inicial para a listagem de usuários.

Na _view_ `index.ejs` , vamos acrescentar o botão:

``` ejs
<div class="cta">
  <a href="/users" rel="next" target="_self" title="Ver listagem de usuários" class="cta__btn">Ver Lista de Usuários</a>
</div>
```

E vamos adicionar um estilo para esse CTA:

``` css
.cta__btn {
    background-color: var(--azul);
    border: none;
    color: var(--branco);
    display: inline-block;
    font-weight: bolder;
    text-align: center;
    margin: auto;
    padding: 6px 12px;
}

.cta__btn:hover {
    background-color: var(--chumbo);
    color: var(--azul);
    cursor: pointer;
}
```

Tá pronto!

## Menu Superior

Que tal incluirmos os links de navegação para o nosso projeto?

**View**

Vamos incluir links para a página inicial, página de usuários e para o repositório (link externo).

``` ejs
<nav class="header__nav">
  <a href="/" target="_self" rel="next" title="Acessar página iniciar">Início</a>
  <a href="/users" target="_self" rel="next" title="Ver listagem de usuários">Usuários</a>
  <a href="https://github.com/Marcelo-Diament/sequelize-aula-01" target="_blank" rel="author" title="Ver repositório">Repositório</a>
</nav>
```

Como o menu é extremamente enxuto, não iremos nos preocupar com o comportamento dele em dispositivos móveis nessa tarefa. Mas fica de desafio - criar um menu mobile (sugestão: manter a estrutura e utilizar _media queries_ utilizando o conceito _mobile first_ - onde a _media query_ lida com dispositivos maiores e o _default_ considera o _mobile_).

Nosso estilo ficará assim:

``` css
.header {
    align-items: center;
    display: flex;
    justify-content: space-between;
}

.header__title {
    font-size: 16px;
}

.header__nav a {
    color: var(--branco);
    font-weight: bolder;
}

.header__nav a:not(:last-child)::after {
    content: ' | ';
}
```

Tá aí! Mais uma melhoria implantada.

## Tabela de Usuários no Mobile

Agora um desafio bacana de CSS - como definir um comportamento da tabela no mobile de forma que o usuário possa ver todos os dados de maneira confortável? Vamos por partes.

**Meta dado _viewport_**

Primeiro, vamos incluir um meta dado no `header` para conseguirmos controlar o estilo por _media query_:

``` ejs
<meta name="viewport" content="width=device-width,initial-scale=1">
```

Essa _meta tag_ carregará o conteúdo com um zoom de 100% e considerará a largura do dispositivo como a largura do site.

**View**

Agora vamos preparar nossas _tags_ HTML para podermos trabalhar, em seguida, com o estilo (CSS).

``` ejs
<td class="user__id" data-title="ID"><%=user.id%></td>
<td class="user__name" data-title="Nome"><%= user.nome %></td>
<td class="user__lastname" data-title="Sobrenome"><%= user.sobrenome %></td>
<td class="user__email" data-title="Email"><%= user.email %></td>
<td class="user__function" data-title="Função"><%= user.id_funcao === 1 ? 'Admin' : 'Usuário Final' %></td>
```

Incluímos um atributo chamado `data-title` nas _tags_ `td` do id, nome, sobrenome e email. Fizemos isso para, no estilo, incluirmos o título de cada coluna (replicado nesse atributo) antes de cada valor, para que fique claro qual a 'chave' do valor mostrado para o usuário.

**Estilo**

Agora chegou a parte do desafio! Seria muito mais fácil incluirmos um _media query_ para resolução _mobile_. Mas como queremos fazer as coisas do jeito certo, utilizaremos o conceito de _mobile first_, onde consideraremos a resolução _mobile_ como padrão e utilizaremos as _media queries_ para tratarmos resoluções maiores ( `min-width: 768px` ).

Então primeiro vamos manipular a tabela de forma a:

1. Esconder os cabeçalhos, com exceção do primeiro (do ID).

2. Trocar o título do ID por 'Usuários' usando o pseudoelemento `::before`.

3. Trocar o valor da propriedade `display` de forma que cada `td` fique uma abaixo da outra.

4. Incluir o valor do atributo `data-title` como pseudoelemento `::before` antes de cada valor da `td` (para que fique como "ID: 1 | Nome: Fulano...").

5. Inserir um `border-bottom` na última `td` (célula, _table data_) de cada `tr` (_table row_) para dividirmos visualmente os dados de cada usuário.

6. Através da _media query_, garantirmos que a tabela se comportará como antes quando a resolução/largura for superior a 767px.

7. Vamos aproveitar para impor uma largura máxima para o formulário de adição de usuário.

Tendo tudo isso em mente, os trechos alterados (referentes à tabela de usuários) são os seguintes:

``` css
.users-table th,
.users-table td {
    padding: 6px 12px;
}

.users-table td {
    display: block;
}

.users-table td:not(:nth-child(n+6))::before {
    content: attr(data-title) ": ";
    font-weight: bolder;
}

.users-table thead tr th:first-child {
    color: transparent;
    font-size: 0;
}

.users-table thead tr th:first-child::before {
    color: var(--branco);
    content: 'Usuários';
    font-size: 16px;
}

.users-table thead tr th:not(:first-child) {
    display: none;
}

.users-table tbody tr td:last-child {
    border-bottom: 1px solid var(--cinza);
    margin-bottom: 16px;
    padding-bottom: 16px;
}
```

O trecho da _media query_ ficará assim (lembre-se de deixar esse trecho no final do arquivo):

``` css
@media screen and (min-width: 768px) {

    .users-table td {
        display: table-cell;
    }

    .users-table td:not(:nth-child(n+6))::before {
        content: none;
    }

    .users-table thead tr th:first-child {
        color: var(--branco);
        font-size: initial;
    }

    .users-table thead tr th:first-child::before {
        content: none;
    }

    .users-table thead tr th:not(:first-child) {
        display: table-cell;
    }

    .users-table tbody tr td:last-child {
        border-bottom: none;
        margin-bottom: auto;
        padding-bottom: auto;
    }
}
```

E os ajustes dos inputs dos formulários ( `display` e `max-width` ):

``` css
.register-user .form__input-container input,
.edit-user .form__input-container input {
    display: block;
    max-width: calc(100vw - 64px);
    padding: 4px 8px;
    width: -webkit-fill-available;
}
```

Agora podemos testar no navegador diferentes resoluções e ver como a tabela se comporta. =)

___

# Obrigado pela visita!

Vamos nos conectar? Se quiser trocar idéias, experiências e figurinhas, entre em contato comigo!

Marcelo Diament | Prorietário na [Djament Comunicação](http://djament.com.br/), Development Chapter Leader na [Driven.cx](https://www.driven.cx/) e Instrutor de Programação Full Stack na [Digital House](http://digitalhouse.com.br/) | [Github](https://github.com/Marcelo-Diament) | [LinkedIn](https://www.linkedin.com/in/marcelodiament/)
