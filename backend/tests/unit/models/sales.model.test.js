const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSales, allSalesById } = require('../sales.mocks');

describe('Sales Model Tests', function () {
  it('Should be able to find all sales successfully', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    
    const sales = await salesModel.findAll();
    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(3);
    expect(sales).to.be.deep.equal(allSales);
  });

  it('Should fail to find a non-existent sales by Id', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const inputData = 999;
    const sales = await salesModel.findById(inputData);
    expect(sales).to.be.an('array');
    expect(sales).to.deep.equal([]);
  });

  it('Should be able to find a sale by its sale_id', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesById]);

    const inputData = 1;
    const sales = await salesModel.findById(inputData);
    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(2);
    expect(sales).to.deep.equal(allSalesById);
  });

  afterEach(function () {
    sinon.restore();
  });
});