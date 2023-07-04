const express = require('express');
const { productsController, salesController } = require('./controllers');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.findAll);
app.get('/products/:id', productsController.findById);
app.get('/sales', salesController.findAll);
app.get('/sales/:id', salesController.findById);
app.post('/products', productsController.createProduct);
app.post('/sales', salesController.createSale);
app.put('/products/:id', productsController.update);
app.delete('/products/:id', productsController.deleteProduct);
app.delete('/sales/:id', salesController.deleteSale);
app.put('/sales/:saleId/products/:productId/quantity', salesController.updateSalesProduct);

module.exports = app;
