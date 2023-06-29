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
  const { name } = productDataObject;
  if (!name) {
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  } 

  if (name && name.length < 6) {
    return { status: 'UNPROCESSABLE_ENTITY',
    data: { message: '"name" length must be at least 5 characters long' } };
  }

  const newProductId = await productsModel.insert(productDataObject);
  const newProduct = await productsModel.findById(newProductId);

  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  findAll,
  findById,
  insert,
};