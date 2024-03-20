const express = require('express');
const servicesProducts = require('../services/servicesProducts');

const app = express();

app.use(express.json());

const getProducts = async (req, res) => {
  const result = await servicesProducts.getProducts();
  res.status(result.status).json(result.data);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const result = await servicesProducts.getProductsById(id);
  res.status(result.status).json(result.data);
};

module.exports = { getProducts, getProductsById };