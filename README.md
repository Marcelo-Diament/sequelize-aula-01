# Sequelize | Raw Queries

Prática referente à aula de introdução ao Sequelize.

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

#### Criando a tabela users

Agora vamos criar uma tabela dentro desse banco, vai se chamar `usuarios` :

``` mysql
CREATE TABLE usuarios (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
```

Será uma tabela extremamente simples, apenas com os campos ID, Nome, Sobrenome e Email.

#### Populando a tabela

Por fim, incluiremos alguns usuários na tabela:

``` mysql
INSERT INTO usuarios (nome, sobrenome, email)
VALUES ('Fulano', 'Dias', 'fulano@dias.com'),
('Ciclano', 'Junior', 'ciclano@junior.com'),
('Beltrano', 'Santos', 'beltrano@santos.com'),
('Joselito', 'Sem Noção', 'joselito@semnocao.com'),
('Irmão', 'do Jorel', 'irmao@dojorel.com'),
('Microwave', 'Warriors', 'microwave@warriors.com'),
('Julius', 'Pai do Chris', 'julius@free.com'),
('Marcelo', 'Diament', 'marcelo@diament.com'),
('Bill', 'Portões', 'bill_portoes@janelas.com'),
('Steve', 'Trampos', 'steve_trampos@maca.com');
```

Podemos ainda executar `SELECT * FROM usuarios;` para vermos os registros inseridos.

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

E, para finalizarmos, vamos atualizar nossa _view_ `index` (em `./backend/views/index.ejs`). Somente trocaremos a frase padrão pela propriedade `subtitle` que criamos no _controller_:

```ejs
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
