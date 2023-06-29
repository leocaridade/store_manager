const productsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const productsFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productsFromDB,
};

const productFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productFromDB,
};

const productFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const productIdFromDB = {
  insertId: 4,
};

const productIdFromModel = 4;

module.exports = {
  productsFromDB,
  productFromDB,
  productsFromServiceSuccessful,
  productFromServiceSuccessful,
  productFromServiceNotFound,
  productIdFromDB,
  productIdFromModel,
};