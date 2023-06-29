const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);

  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  return { status: 'SUCCESSFUL', data: product };
};

const insert = async (productDataObject) => {
  const newProductId = await productsModel.insert(productDataObject);
  const newProduct = await productsModel.findById(newProductId);

  return { status: 'SUCCESSFUL', data: newProduct };
};

module.exports = {
  findAll,
  findById,
  insert,
};