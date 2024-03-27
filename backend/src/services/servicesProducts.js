const modelProducts = require('../models/modelsProducts');

const getProducts = async () => {
  const products = await modelProducts.getAllProducts();
  return { status: 'SUCCESS', data: products };
};

const getProductsById = async (id) => {
  const products = await modelProducts.getProductsById(id);
  if (!products) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESS', data: products };
};

const insertProduct = async (name) => {
  const product = await modelProducts.insertProduct(name);
  return { status: 'CREATED', data: product };
};

module.exports = { getProducts,
  getProductsById,
  insertProduct };