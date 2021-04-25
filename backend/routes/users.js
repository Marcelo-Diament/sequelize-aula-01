const express = require('express'),
  router = express.Router(),
  controller = require('../controllers/users')

router.get('/', controller.list)
router.post('/', controller.add)
router.get('/:id', controller.index)

module.exports = router