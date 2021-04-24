const controller = {
  list: (req, res, next) => {
    res.render('users', {
      title: 'Página de Usuários',
      subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
      users: [
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