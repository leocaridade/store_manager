const { productsModel } = require('../models');

const validateFields = (salesData) => {
  const hasProductId = salesData.every((sale) => sale.productId);
  if (!hasProductId) return { status: 'BAD_REQUEST', data: { message: '"productId" is required' } };

  const hasQuantity = salesData
    .every((sale) => sale.quantity !== undefined && sale.quantity !== null);
  if (!hasQuantity) return { status: 'BAD_REQUEST', data: { message: '"quantity" is required' } };

  const isQuantityValid = salesData.every((sale) => +sale.quantity >= 1);
  if (!isQuantityValid) {
    return { status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"quantity" must be greater than or equal to 1' } };
  }
};

const validateProductId = async (salesData) => {
  const products = await productsModel.findAll();
  const productIds = products.map((product) => product.id);
  return salesData.every((sale) => productIds.includes(sale.productId));
};

module.exports = {
  validateFields,
  validateProductId,
};