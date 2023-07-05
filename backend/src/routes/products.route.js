const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/search', productsController.findByQuery);
route.get('/', productsController.findAll);
route.get('/:id', productsController.findById);
route.post('/', productsController.createProduct);
route.put('/:id', productsController.update);
route.delete('/:id', productsController.deleteProduct);

module.exports = route;