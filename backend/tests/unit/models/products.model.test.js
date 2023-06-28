const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productsFromDB, productFromDB } = require('./products.mock');

describe('Products Model Tests', function () {
  it('Should be able to find all products successfully', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    
    const products = await productsModel.findAll();
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(productsFromDB);
  });

  it('Should fail to find a non-existent product', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const inputData = 999;
    const product = await productsModel.findById(inputData);
    expect(product).to.deep.equal(undefined);
  });

  it('Should be able to find a product by its Id', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);

    const inputData = 1;
    const product = await productsModel.findById(inputData);
    expect(product).to.be.an('object');
    expect(product).to.deep.equal(productFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});