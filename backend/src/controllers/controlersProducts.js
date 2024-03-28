const servicesProducts = require('../services/servicesProducts');

const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
  DELETED: 204,
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

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const result = await servicesProducts.insertProduct(name);
  return res.status(STATUS_CODE[result.status]).json(result.data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await servicesProducts.updateProduct(id, name);
  return res.status(STATUS_CODE[result.status]).json(result.data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await servicesProducts.deleteProduct(id);
  return res.status(STATUS_CODE[result.status]).json(result.data);
};

module.exports = { getProducts,
  getProductsById,
  insertProduct,
  updateProduct,
  deleteProduct };