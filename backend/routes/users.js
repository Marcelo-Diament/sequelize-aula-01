const express = require('express'),
  router = express.Router(),
  controller = require('../controllers/users')

router.post('/:id/delete', controller.delete)
router.get('/:id', controller.index)
router.post('/:id', controller.update)
router.get('/', controller.list)
router.post('/', controller.add)

module.exports = router