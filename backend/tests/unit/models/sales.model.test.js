const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  allSales,
  allSalesById,
  salesIdFromDB,
  salesIdFromModel,
} = require('../sales.mocks');
const { returnFromDelete } = require('../products.mocks');

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

  it('Should be able to create a sales successfully', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([salesIdFromDB])
      .onSecondCall()
      .resolves(null);

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
    const insertId = await salesModel.insertSales(inputData);

    expect(insertId).to.be.a('number');
    expect(insertId).to.equal(salesIdFromModel);
  });

  it('Should be able to delete a sale successfully', async function () {
    sinon.stub(connection, 'execute').resolves(returnFromDelete);

    const result = await salesModel.deleteSale();

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0].affectedRows).to.be.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});