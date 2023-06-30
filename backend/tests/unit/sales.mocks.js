const date = '2023-06-29T15:33:00.000Z';

const allSales = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date,
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date,
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date,
  },
];

const allSalesById = [
  {
    productId: 1,
    quantity: 5,
    date,
  },
  {
    productId: 2,
    quantity: 10,
    date,
  },
];

const salesIdFromDB = {
  insertId: 3,
};

const salesIdFromModel = 3;

const allSalesFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: allSales,
};

const allSalesByIdFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: allSalesById,
};

const salesFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

module.exports = {
  allSales,
  allSalesById,
  salesIdFromDB,
  salesIdFromModel,
  allSalesFromServiceSuccessful,
  allSalesByIdFromServiceSuccessful,
  salesFromServiceNotFound,
};