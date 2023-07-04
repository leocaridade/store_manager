const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const {
  productsFromDB,
  productFromDB,
  productIdFromDB,
  productIdFromModel,
  returnFromUpdate,
  returnFromDelete,
} = require('../products.mocks');

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

  it('Should be able to create a product successfully', async function () {
    sinon.stub(connection, 'execute').resolves([productIdFromDB]);

    const inputData = { name: 'Teia de Aranha' };
    const insertId = await productsModel.insert(inputData);

    expect(insertId).to.be.a('number');
    expect(insertId).to.equal(productIdFromModel);
  });

  it('Should be able to update a product successfully', async function () {
    sinon.stub(connection, 'execute').resolves(returnFromUpdate);

    const productId = 1;
    const inputData = { name: 'Teia de Aranha' };
    
    const result = await productsModel.update(productId, inputData);

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0].affectedRows).to.be.equal(1);
    expect(result[0].changedRows).to.be.equal(1);
  });

  it('Should be able to delete a product successfully', async function () {
    sinon.stub(connection, 'execute').resolves(returnFromDelete);

    const result = await productsModel.deleteProduct();

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0].affectedRows).to.be.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});