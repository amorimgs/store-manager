const express = require('express');
const controlerProducts = require('./controllers/controlersProducts');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', controlerProducts.getProducts);
app.get('/products/:id', controlerProducts.getProductsById);

module.exports = app;
