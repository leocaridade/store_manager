const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { allSales, allSalesById, salesIdFromModel, saleByProductId } = require('../sales.mocks');
const { returnFromDelete, returnFromUpdate } = require('../products.mocks');

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

  it('Should be able to delete a sale successfully', async function () {
    sinon.stub(salesModel, 'findById').resolves(allSalesById);
    sinon.stub(salesModel, 'deleteSale').resolves(returnFromDelete);

    const saleId = 1;

    const response = await salesService.deleteSale(saleId);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('DELETED');
  });

  it('Should fail to delete a sale with a non-existent id', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const saleId = 999;
    const response = await salesService.deleteSale(saleId);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Sale not found' });
  });

  it('Should fail to update the product quantity of a sale without quantity', async function () {
    // sinon.stub(salesModel, 'execute').resolves(returnFromUpdate);

    const inputData = {
      saleId: 1,
      productId: 2,
    };

    const response = await salesService.updateSalesProduct(inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('BAD_REQUEST');
    expect(response.data).to.deep.equal({ message: '"quantity" is required' });
  });

  it('Should fail to update the product quantity of a sale with quantity = 0', async function () {
    // sinon.stub(salesModel, 'execute').resolves(returnFromUpdate);

    const inputData = {
      quantity: 0,
      saleId: 1,
      productId: 2,
    };

    const response = await salesService.updateSalesProduct(inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('UNPROCESSABLE_ENTITY');
    expect(response.data).to.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Should fail to update the product quantity of a sale with a non-existent productId', async function () {
    // sinon.stub(salesModel, 'execute').resolves(returnFromUpdate);

    const inputData = {
      quantity: 30,
      saleId: 1,
      productId: 999,
    };

    const response = await salesService.updateSalesProduct(inputData);
    
    expect(response).to.be.an('object');
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Product not found in sale' });
  });

  it('Should fail to update the product quantity of a sale with a non-existent saleId', async function () {
    // sinon.stub(salesModel, 'execute').resolves(returnFromUpdate);

    const inputData = {
      quantity: 30,
      saleId: 999,
      productId: 2,
    };

    const response = await salesService.updateSalesProduct(inputData);
    
    expect(response).to.be.an('object');
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Sale not found' });
  });

  it('Should be able to update a sale by its productId successfully', async function () {
    sinon.stub(salesModel, 'updateSalesProduct').resolves(returnFromUpdate);
    sinon.stub(salesModel, 'findByProductId').resolves(saleByProductId);

    const inputData = {
      quantity: 30,
      saleId: 1,
      productId: 2,
    };

    const response = await salesService.updateSalesProduct(inputData);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.deep.equal(saleByProductId);
  });

  afterEach(function () {
    sinon.restore();
  });
});