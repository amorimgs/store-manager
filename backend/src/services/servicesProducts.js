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

const updateProduct = async (id, name) => {
  const verifyProduct = await modelProducts.getProductsById(id);
  if (!verifyProduct) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  const product = await modelProducts.updateProduct(id, name);
  return { status: 'SUCCESS', data: product };
};

const deleteProduct = async (id) => {
  const verifyProduct = await modelProducts.getProductsById(id); 
  if (!verifyProduct) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  await modelProducts.deleteProduct(id);
  return { status: 'DELETED' };
};

module.exports = { getProducts,
  getProductsById,
  insertProduct,
  updateProduct,
  deleteProduct };