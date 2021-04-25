const Sequelize = require('sequelize'),
  config = require('../config/database'),
  db = new Sequelize(config)

const controller = {
  list: async (req, res, next) => {
    const users = await db.query('SELECT * from usuarios', { type: Sequelize.QueryTypes.SELECT })
    res.render('users', {
      title: 'Página de Usuários',
      subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
      users,
      edit: false
    })
  },
  index: async (req, res, next) => {
    const user = await db.query(`SELECT * from usuarios WHERE usuarios.id = ${req.params.id}`, { type: Sequelize.QueryTypes.SELECT })
      req.query.edit === 'edit'
      ? res.render('users', {
        title: 'Página de Edição o Usuário',
        subtitle: 'Preencha o formulário para editar seu usuário',
        users: user,
        edit: true
      })
      : res.render('users', {
        title: 'Página do Usuário',
        subtitle: 'Confira a seguir o usuário encontrado em nosso banco de dados',
        users: user,
        edit: false
      })
  },
  add: async (req, res, next) => {
    const {
      nome,
      sobrenome,
      email
    } = req.body
    const user = await db.query(`INSERT INTO usuarios (nome, sobrenome, email) VALUES (:nome, :sobrenome, :email)`, {
      replacements: {
        nome,
        sobrenome,
        email
      },
      type: Sequelize.QueryTypes.INSERT
    })
    if (user) {
      res.redirect('/users')
    } else {
      res.status(500).send('Ops... Algo de errado não deu certo!')
    }
  },
  update: async (req, res, next) => {
    const { nome, sobrenome, email } = req.body
    let { id } = req.params
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
  },
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
}

module.exports = controller