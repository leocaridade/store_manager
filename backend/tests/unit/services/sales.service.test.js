const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { allSales, allSalesById, salesIdFromModel } = require('../sales.mocks');

describe('Sales Service Tests', function () {
  it('Should be able to find all sales successfully', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSales);
    
    const response = await salesService.findAll();
    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.deep.equal(allSales);
  });

  it('Should fail to find a non-existent sales by Id', async function () {
    const inputData = 999;
    const response = await salesService.findById(inputData);
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Sale not found' });
  });

  it('Should be able to find a sales by its Id', async function () {
    sinon.stub(salesModel, 'findById').resolves(allSalesById);

    const inputData = 1;
    const response = await salesService.findById(inputData);
    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.deep.equal(allSalesById);
  });

  it('Should be able to create a sales successfully', async function () {
    sinon.stub(salesModel, 'insertSales').resolves(salesIdFromModel);

    const inputData = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const response = await salesService.createSale(inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('CREATED');
    expect(response.data).to.deep.equal({ id: salesIdFromModel, itemsSold: inputData });
  });

  it('Should fail to create a sale without column "productId"', async function () {
    const inputData = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        quantity: 5,
      },
    ];
    const response = await salesService.createSale(inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('BAD_REQUEST');
    expect(response.data).to.deep.equal({ message: '"productId" is required' });
  });

  it('Should fail to create a sale without column "quantity"', async function () {
    const inputData = [
      {
        productId: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const response = await salesService.createSale(inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('BAD_REQUEST');
    expect(response.data).to.deep.equal({ message: '"quantity" is required' });
  });

  it('Should fail to create a sale with a quantity less than or equal to 0', async function () {
    const inputData = [
      {
        productId: 1,
        quantity: 0,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const response = await salesService.createSale(inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('UNPROCESSABLE_ENTITY');
    expect(response.data).to.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Should fail to create a sale with a non-existent productId', async function () {
    const inputData = [
      {
        productId: 5,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const response = await salesService.createSale(inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});