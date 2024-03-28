const express = require('express');
const controlerProducts = require('./controllers/controlersProducts');
const controlerSales = require('./controllers/controlersSales');
const middlewares = require('./middlewares/myMiddlewares');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', controlerProducts.getProducts);
app.get('/products/:id', controlerProducts.getProductsById);
app.post('/products', middlewares.validateName, controlerProducts.insertProduct);
app.put('/products/:id', middlewares.validateName, controlerProducts.updateProduct);
app.delete('/products/:id', controlerProducts.deleteProduct);

app.get('/sales', controlerSales.getSales);
app.get('/sales/:id', controlerSales.getSalesById);
app.post(
  '/sales',
  middlewares.validateProductId,
  middlewares.validateQuantity,
  controlerSales.insertSale,
);

module.exports = app;
