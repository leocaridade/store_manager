const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  allSales,
  allSalesById,
  allSalesFromServiceSuccessful,
  salesFromServiceNotFound,
  allSalesByIdFromServiceSuccessful,
  saleCreatedSuccessfully,
  saleCreated,
  salesFromServiceDeleted,
} = require('../sales.mocks');

describe('Sales Controller Tests', function () {
  it('Should be able to find all sales successfully - Status 200', async function () {
    sinon.stub(salesService, 'findAll').resolves(allSalesFromServiceSuccessful);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);
  });

  it('Should fail to find a non-existent sale - Status 404', async function () {
    sinon.stub(salesService, 'findById').resolves(salesFromServiceNotFound);

    const req = { params: { id: 999 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(salesFromServiceNotFound.data);
  });

  it('Should be able to find a sale by its Id - Status 200', async function () {
    sinon.stub(salesService, 'findById').resolves(allSalesByIdFromServiceSuccessful);

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesById);
  });

  it('Should be able to create a sale successfully - Status 201', async function () {
    sinon.stub(salesService, 'createSale').resolves(saleCreatedSuccessfully);
    const bodyData = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];

    const req = { params: { }, body: { bodyData } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.createSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(saleCreated);
  });

  it('Should be able to delete a sale successfully - Status 204', async function () {
    sinon.stub(salesService, 'deleteSale').resolves(salesFromServiceDeleted);

    const req = { params: { id: '1' }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });

  it('Should fail to delete a sale with a non-existent id - Status 404', async function () {
    sinon.stub(salesService, 'deleteSale').resolves(salesFromServiceNotFound);

    const req = { params: { id: '999' }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(salesFromServiceNotFound.data);
  });

  afterEach(function () {
    sinon.restore();
  });
});