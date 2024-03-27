const express = require('express');
const servicesSales = require('../services/servicesSales');

const app = express();

app.use(express.json());

const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
};

const getSales = async (req, res) => {
  const result = await servicesSales.getSales();
  return res.status(STATUS_CODE[result.status]).json(result.data);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const result = await servicesSales.getSalesById(id);
  return res.status(STATUS_CODE[result.status]).json(result.data);
};

const insertSale = async (req, res) => {
  const result = await servicesSales.insertSale(req.body);
  return res.status(STATUS_CODE[result.status]).json(result.data);
};

module.exports = { getSales, getSalesById, insertSale };