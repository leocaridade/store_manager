const { productsModel, salesModel } = require('../models');

const validateProductId = async (salesData) => {
  const products = await productsModel.findAll();
  const productIds = products.map((product) => product.id);
  return salesData.every((sale) => productIds.includes(sale.productId));
};

const validateQuantity = (quantity) => {
  if (quantity === undefined && quantity !== null) {
    return { status: 'BAD_REQUEST', data: { message: '"quantity" is required' } };
  }

  if (quantity < 1) {
    return { status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"quantity" must be greater than or equal to 1' } };
  }

  return null;
};

const validateProductExistsInSale = async (productId) => {
  const allProducts = await salesModel.findAll();
  const isProductExists = allProducts.some((product) => product.productId === Number(productId));

  if (!isProductExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
  }

  return null;
};

const validateSaleExists = async (saleId) => {
  const sales = await salesModel.findById(saleId);

  if (sales.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return null;
};

module.exports = {
  validateProductId,
  validateQuantity,
  validateProductExistsInSale,
  validateSaleExists,
};