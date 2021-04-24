const Sequelize = require('sequelize'),
  config = require('../config/database'),
  db = new Sequelize(config)

const controller = {
  list: async (req, res, next) => {
    const users = await db.query('SELECT * from usuarios', { type: Sequelize.QueryTypes.SELECT })
    res.render('users', {
      title: 'Página de Usuários',
      subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
      users
    })
  },
  index: async (req, res, next) => {
    const user = await db.query(`SELECT * from usuarios WHERE usuarios.id = ${req.params.id}`, { type: Sequelize.QueryTypes.SELECT })
    res.render('users', {
      title: 'Página de Usuário',
      subtitle: 'Confira a seguir o usuário encontrado em nosso banco de dados',
      users: user
    })
  }
}

module.exports = controller