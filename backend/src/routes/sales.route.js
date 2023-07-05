const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.findAll);
route.get('/:id', salesController.findById);
route.post('/', salesController.createSale);
route.delete('/:id', salesController.deleteSale);
route.put('/:saleId/products/:productId/quantity', salesController.updateSalesProduct);

module.exports = route;