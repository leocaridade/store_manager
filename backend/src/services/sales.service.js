const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (productId) => {
  const sales = await salesModel.findById(productId);

  if (sales.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  return { status: 'SUCCESSFUL', data: sales };
};

const createSale = async (salesDataArray) => {
  const newSaleId = await salesModel.insertSales(salesDataArray);
  const newSale = { id: newSaleId, itemsSold: salesDataArray };

  return { status: 'CREATED', data: newSale };
};

module.exports = {
  findAll,
  findById,
  createSale,
};