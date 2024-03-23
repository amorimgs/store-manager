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

module.exports = { getSales,
  getSalesById };