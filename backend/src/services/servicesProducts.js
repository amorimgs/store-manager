const modelProducts = require('../models/modelsProducts');

const getProducts = async () => {
  const products = await modelProducts.getAllProducts();
  return { status: 200, data: products };
};

const getProductsById = async (id) => {
  const products = await modelProducts.getProductsById(id);
  if (!products) return { status: 404, data: { message: 'Product not found' } };
  return { status: 200, data: products };
};

module.exports = { getProducts,
  getProductsById };