const express = require('express');
const servicesProducts = require('../services/servicesProducts');

const app = express();

app.use(express.json());

const STATUS_CODE = {
  SUCCESS: 200,
  NOT_FOUND: 404,
};

const getProducts = async (req, res) => {
  const result = await servicesProducts.getProducts();
  return res.status(STATUS_CODE[result.status]).json(result.data);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const result = await servicesProducts.getProductsById(id);
  return res.status(STATUS_CODE[result.status]).json(result.data);
};

module.exports = { getProducts, getProductsById };