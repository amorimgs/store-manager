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

const insertSale = async () => {
  const [result] = await connection.execute(`
  INSERT INTO StoreManager.sales () VALUES
  ();`, []);
  return { id: result.insertId };
};

const insertSaleProduct = async (data) => {
  const query = `INSERT INTO StoreManager.sales_products 
  (sale_id, product_id, quantity) VALUES (?,?,?)`;

  data.forEach(async (el) => {
    await connection.execute(query, [el.saleId, el.productId, el.quantity]);
  });
  return data.map((el) => ({ productId: el.productId, quantity: el.quantity }));
};

module.exports = { 
  getAllSales,
  getSalesById,
  insertSale,
  insertSaleProduct };