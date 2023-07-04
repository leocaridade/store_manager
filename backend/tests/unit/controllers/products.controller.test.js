const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const {
  productsFromDB,
  productFromDB,
  productsFromServiceSuccessful,
  productFromServiceSuccessful,
  productFromServiceNotFound,
  productFromServiceCreated,
  productCreated,
  productFromServiceUpdated,
  updatedProductFromDB,
} = require('../products.mocks');
const { productsController } = require('../../../src/controllers');

describe('Products Controller Tests', function () {
  it('Should be able to find all products successfully - Status 201', async function () {
    sinon.stub(productsService, 'findAll').resolves(productsFromServiceSuccessful);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromDB);
  });

  it('Should fail to find a non-existent product - Status 404', async function () {
    sinon.stub(productsService, 'findById').resolves(productFromServiceNotFound);

    const req = { params: { id: 999 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(productFromServiceNotFound.data);
  });

  it('Should be able to find a product by its Id - Status 200', async function () {
    sinon.stub(productsService, 'findById').resolves(productFromServiceSuccessful);

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromDB);
  });

  it('Should be able to create a product successfully - Status 200', async function () {
    sinon.stub(productsService, 'insert').resolves(productFromServiceCreated);

    const req = { params: { }, body: { name: 'Teia de Aranha' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productCreated);
  });

  it('Should be able to update a product successfully - Status 200', async function () {
    sinon.stub(productsService, 'update').resolves(productFromServiceUpdated);

    const req = { params: { id: '1' }, body: { name: 'Martelo do Batman' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.update(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProductFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});