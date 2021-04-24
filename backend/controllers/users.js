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
  }
}

module.exports = controller