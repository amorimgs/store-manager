const chai = require('chai');
const sinon = require('sinon');
const modelsProducts = require('../../../src/models/modelsProducts');
const servicesProducts = require('../../../src/services/servicesProducts');

const { expect } = chai;

describe('Testando Services Products', function () {
  const resultStub = [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
    },
  ];
  
  afterEach(function () {
    sinon.restore();
  });

  it('Retorna a lista completa de products!', async function () {
    sinon.stub(modelsProducts, 'getAllProducts').returns(resultStub);
    const result = await servicesProducts.getProducts();
    expect(result.status).to.be.equal('SUCCESS');
  });

  it('Retorna um products!', async function () {
    sinon.stub(modelsProducts, 'getProductsById').resolves({
      id: 1,
      name: 'Martelo de Thor',
    });
    const result = await servicesProducts.getProductsById(1);
    expect(result.status).to.be.equal('SUCCESS');
    expect(result.data.id).to.be.equal(1);
  });

  it('Não retorna products!', async function () {
    sinon.stub(modelsProducts, 'getProductsById').resolves(undefined);
    const result = await servicesProducts.getProductsById(123);
    expect(result.status).to.be.equal('NOT_FOUND');
  });
}); 