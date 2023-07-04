const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsFromDB, productFromDB, productIdFromModel, productCreated, updatedProductFromDB, returnFromUpdate } = require('../products.mocks');
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

  it('Should be able to create a product successfully', async function () {
    sinon.stub(productsModel, 'insert').resolves(productIdFromModel);
    sinon.stub(productsModel, 'findById').resolves(productCreated);

    const inputData = { name: 'Teia de Aranha' };
    const response = await productsService.insert(inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('CREATED');
    expect(response.data).to.deep.equal(productCreated);
  });

  it('Should fail to create a product without column "name"', async function () {
    const inputData = { login: 'Teia de Aranha' };
    const response = await productsService.insert(inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('BAD_REQUEST');
    expect(response.data).to.deep.equal({ message: '"name" is required' });
  });

  it('Should fail to create a product with a name less than 6 characters', async function () {
    const inputData = { name: 'Arroz' };
    const response = await productsService.insert(inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('UNPROCESSABLE_ENTITY');
    expect(response.data).to.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('Should be able to update a product successfully', async function () {
    sinon.stub(productsModel, 'findById')
      .onFirstCall()
      .resolves(productFromDB)
      .onSecondCall()
      .resolves(updatedProductFromDB);
    sinon.stub(productsModel, 'update').resolves(returnFromUpdate);

    const productId = 1;
    const inputData = { name: 'Martelo do Batman' };

    const response = await productsService.update(productId, inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.deep.equal(updatedProductFromDB);
  });

  it('Should fail to update a product without column "name"', async function () {
    const productId = 1;
    const inputData = { login: 'Teia de Aranha' };
    const response = await productsService.update(productId, inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('BAD_REQUEST');
    expect(response.data).to.deep.equal({ message: '"name" is required' });
  });

  it('Should fail to update a product with a name less than 6 characters', async function () {
    const productId = 2;
    const inputData = { name: 'Arroz' };
    const response = await productsService.update(productId, inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('UNPROCESSABLE_ENTITY');
    expect(response.data).to.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('Should fail to update a product with a non-existent id', async function () {
    const productId = 5;
    const inputData = { name: 'Martelo do Batman' };
    const response = await productsService.update(productId, inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});