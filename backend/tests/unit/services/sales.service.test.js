const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { allSales, allSalesById } = require('../sales.mocks');

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

  afterEach(function () {
    sinon.restore();
  });
});