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

6. NPM instalado (verifique se está instalado com o comando de terminal `npm -v`)

### Tecnologias

**Linguagens**

Basicamente utilizaremos JavaScript, MySQL e Bash (comandos de terminal).

**Frameworks, Bibliotecas e Pacotes**

Para essa prática usaremos o Node.js como tecnologia de back end.

Para o servidor, utilizaremos o Express (e o pacote Express Generator para facilitar nossa vida).

Para a interface com o usuário, utilizaremos o EJS como template engine.

Para o banco de dados, seguiremos com MySQL como linguagem (e o pacote MySQL2) e utilizaremos o Sequelize (e o Sequelize-CLI como dependência para desenvolvimento) para manipular o banco a partir do back end.

Por fim, usaremos o pacote nodemon para que o servidor seja automaticamente atualizado a cada alteração em nosso código.

## Pré Setup do Projeto

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
