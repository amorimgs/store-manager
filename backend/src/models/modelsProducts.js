const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getProductsById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', 
    [id],
  );
  return result;
};

const insertProduct = async (name) => {
  const [result] = await connection.execute(`
  INSERT INTO StoreManager.products (name) VALUES
  (?);`, [name]);
  return {
    id: result.insertId,
    name };
};

const updateProduct = async (id, name) => {
  await connection.execute(`
  UPDATE StoreManager.products SET name = ? WHERE id = ?;`, [name, id]);
  return { id: +id, name };
};

const deleteProduct = async (id) => {
  await connection.execute(`
  DELETE FROM StoreManager.products WHERE id = ?`, [id]);
};

module.exports = { 
  getAllProducts,
  getProductsById,
  insertProduct,
  updateProduct,
  deleteProduct };