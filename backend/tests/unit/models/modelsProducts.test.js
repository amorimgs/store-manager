const chai = require('chai');
const sinon = require('sinon');
const modelsProducts = require('../../../src/models/modelsProducts');
const connection = require('../../../src/models/connection');

const { expect } = chai;

describe('Testando Models Products', function () {
  const resultStub = [[
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
  ]];

  afterEach(function () {
    sinon.restore();
  });

  it('Retorna a lista completa de products!', async function () {
    sinon.stub(connection, 'execute').returns(resultStub);
    const result = await modelsProducts.getAllProducts();
    expect(result).to.be.length(3);
  });

  it('Retorna um products!', async function () {
    sinon.stub(connection, 'execute').resolves([[{
      id: 1,
      name: 'Martelo de Thor',
    }]]);
    const result = await modelsProducts.getProductsById(1);
    expect(result.id).to.be.equal(1);
  });

  it('Não retorna products!', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const result = await modelsProducts.getProductsById(123);
    expect(result).to.be.equal(undefined);
  });
}); 
