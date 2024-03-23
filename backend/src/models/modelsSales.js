const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id saleId, s.date, sp.product_id productId, sp.quantity   
    FROM sales_products sp
    JOIN sales s ON s.id = sp.sale_id
    ORDER BY sp.sale_id, sp.product_id ASC`,
  );
  return result;
};

const getSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id productId, sp.quantity
    FROM sales_products sp
    JOIN sales s ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY sp.product_id ASC;`, 
    [id],
  );
  return result;
};

module.exports = { 
  getAllSales,
  getSalesById };