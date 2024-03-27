const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const modelsProducts = require('../../../src/models/modelsProducts');
const modelsSales = require('../../../src/models/modelsSales');

const { expect } = chai;

describe('Testando Models', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Testanndo Products', function () {
    it('Retorna a lista completa de products!', async function () {
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

    it('Cadastra um podruto', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      const result = await modelsProducts.insertProduct('ProdutoX');
      expect(result.id).to.be.equal(4);
    });
  });
  describe('Testando Sales', function () {
    const date = '2024-03-24T02:49:04.000Z';
    const resultGetAll = [[
      {
        saleId: 1,
        date,
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date,
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date,
        productId: 3,
        quantity: 15,
      },
    ]];
  
    it('Retorna a lista completa de sales!', async function () {
      sinon.stub(connection, 'execute').returns(resultGetAll);
      const result = await modelsSales.getAllSales();
      expect(result).to.be.length(3);
    });
    it('Retorna um sale!', async function () {
      sinon.stub(connection, 'execute').resolves([[{
        date,
        productId: 1,
        quantity: 5,
      }, {
        date,
        productId: 2,
        quantity: 10,
      }]]);
      const result = await modelsSales.getSalesById(1);
      expect(result).to.be.length(2);
    });
    it('Não retorna sale!', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);
      const result = await modelsSales.getSalesById(123);
      expect(result).to.have.length(0);
    });
  });
}); 
