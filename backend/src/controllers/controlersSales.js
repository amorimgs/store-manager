const express = require('express');
const servicesSales = require('../services/servicesSales');

const app = express();

app.use(express.json());

const STATUS_CODE = {
  SUCCESS: 200,
  NOT_FOUND: 404,
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

module.exports = { getSales, getSalesById };