const { productsModel } = require('../models');

const validateProductId = async (salesData) => {
  const products = await productsModel.findAll();
  const productIds = products.map((product) => product.id);
  return salesData.every((sale) => productIds.includes(sale.productId));
};

module.exports = {
  validateProductId,
};