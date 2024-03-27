const modelSales = require('../models/modelsSales');

const getSales = async () => {
  const Sales = await modelSales.getAllSales();
  return { status: 'SUCCESS', data: Sales };
};

const getSalesById = async (id) => {
  const Sales = await modelSales.getSalesById(id);
  if (!Sales || Sales.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }  
  return { status: 'SUCCESS', data: Sales };
};

const insertSale = async (data) => {
  const { id } = await modelSales.insertSale();
  const newData = data.map((el) => ({ ...el, saleId: id }));
  const itemsSold = await modelSales.insertSaleProduct(newData);
  const result = { id, itemsSold };
  return { status: 'CREATED', data: result };
};

module.exports = { getSales,
  getSalesById,
  insertSale };