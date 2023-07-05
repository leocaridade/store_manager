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

const update = async (productId, productDataObject) => {
  const { name } = productDataObject;
  if (!name) {
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  } 

  if (name && name.length < 6) {
    return { status: 'UNPROCESSABLE_ENTITY',
    data: { message: '"name" length must be at least 5 characters long' } };
  }

  const isProductIdValid = await productsModel.findById(productId);
  if (!isProductIdValid) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  await productsModel.update(productId, productDataObject);

  const updatedProduct = await productsModel.findById(productId);

  return { status: 'SUCCESSFUL', data: updatedProduct };
};

const deleteProduct = async (productId) => {
  const isProductIdValid = await productsModel.findById(productId);
  if (!isProductIdValid) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  await productsModel.deleteProduct(productId);

  return { status: 'DELETED' };
};

const findByQuery = async (query) => {
  const products = await productsModel.findByQuery(query);
  return { status: 'SUCCESSFUL', data: products };
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteProduct,
  findByQuery,
};