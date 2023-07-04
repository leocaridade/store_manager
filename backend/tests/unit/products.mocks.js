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

const updatedProductFromDB = {
  id: 1,
  name: 'Martelo do Batman',
};

const productCreated = {
  id: 4,
  name: 'Teia de Aranha',
};

const productIdFromDB = {
  insertId: 4,
};

const productIdFromModel = 4;

const productsFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productsFromDB,
};

const productFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productFromDB,
};

const productFromServiceCreated = {
  status: 'CREATED',
  data: productCreated,
};

const productFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const productFromServiceBadRequest = {
  status: 'BAD_REQUEST',
  data: { message: '"name" is required' },
};

const productFromServiceInvalidValue = {
  status: 'UNPROCESSABLE_ENTITY',
  data: { message: '"name" length must be at least 5 characters long' },
};

const returnFromUpdate = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1,
},
undefined];

module.exports = {
  productsFromDB,
  productFromDB,
  updatedProductFromDB,
  productsFromServiceSuccessful,
  productFromServiceSuccessful,
  productFromServiceCreated,
  productFromServiceNotFound,
  productFromServiceBadRequest,
  productFromServiceInvalidValue,
  productIdFromDB,
  productIdFromModel,
  productCreated,
  returnFromUpdate,
};