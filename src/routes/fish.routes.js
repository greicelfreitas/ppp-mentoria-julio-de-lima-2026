const router = require('express').Router();
const controller = require('../controllers/fish.controller');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/identify', controller.identify);
router.get('/:id', controller.getById);

module.exports = router;
