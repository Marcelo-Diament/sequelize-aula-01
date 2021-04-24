const controller = {
  index: (req, res, next) => {
    res.render('index', {
      title: 'Página Inicial',
      subtitle: 'Bem vindo à prática de Sequelize #01!'
    })
  }
}

module.exports = controller