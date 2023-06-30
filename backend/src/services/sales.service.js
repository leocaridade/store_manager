const { salesModel } = require('../models');
const { validateProductId } = require('../utils/validations');

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
  const hasProductId = salesDataArray.every((sale) => sale.productId);
  if (!hasProductId) return { status: 'BAD_REQUEST', data: { message: '"productId" is required' } };

  const hasQuantity = salesDataArray
    .every((sale) => sale.quantity !== undefined && sale.quantity !== null);
  if (!hasQuantity) return { status: 'BAD_REQUEST', data: { message: '"quantity" is required' } };

  const isQuantityValid = salesDataArray.every((sale) => +sale.quantity >= 1);
  if (!isQuantityValid) {
    return { status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"quantity" must be greater than or equal to 1' } };
  }

  const isProductExists = await validateProductId(salesDataArray);
  if (!isProductExists) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  const newSaleId = await salesModel.insertSales(salesDataArray);
  const newSale = { id: newSaleId, itemsSold: salesDataArray };

  return { status: 'CREATED', data: newSale };
};

module.exports = {
  findAll,
  findById,
  createSale,
};