const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsFromDB, productFromDB } = require('../products.mocks');
const { productsService } = require('../../../src/services');

describe('Products Service Tests', function () {
  it('Should be able to find all products successfully', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromDB);
    
    const response = await productsService.findAll();
    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.deep.equal(productsFromDB);
  });

  it('Should fail to find a non-existent product', async function () {
    const inputData = 999;
    const response = await productsService.findById(inputData);
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Should be able to find a product by its Id', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromDB);

    const inputData = 1;
    const response = await productsService.findById(inputData);
    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.deep.equal(productFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});