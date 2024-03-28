const chai = require('chai');
const sinon = require('sinon');
const modelsProducts = require('../../../src/models/modelsProducts');
const servicesProducts = require('../../../src/services/servicesProducts');
const modelsSales = require('../../../src/models/modelsSales');
const servicesSales = require('../../../src/services/servicesSales');

const { expect } = chai;

describe('Testando Services', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Testando Products', function () {
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

    it('Cadastra um Produto!', async function () {
      sinon.stub(modelsProducts, 'insertProduct').resolves({ id: 4, name: 'ProductX' });
      const result = await servicesProducts.insertProduct('ProductX');
      expect(result.status).to.be.equal('CREATED');
    });

    it('Atualiza um Produto!', async function () {
      sinon.stub(modelsProducts, 'updateProduct').resolves({ id: 1, name: 'ProductX' });
      const result = await servicesProducts.updateProduct(1, 'ProductX');
      expect(result.status).to.be.equal('SUCCESS');
    });

    it('Atualiza um Produto não existente!', async function () {
      sinon.stub(modelsProducts, 'updateProduct').resolves({ id: 1, name: 'ProductX' });
      sinon.stub(modelsProducts, 'getProductsById').resolves(undefined);
      const result = await servicesProducts.updateProduct(999, 'ProductX');
      expect(result.status).to.be.equal('NOT_FOUND');
    });
  });
  describe('Testando Sales', function () {
    const date = '2024-03-24T02:49:04.000Z';
    const resultStub = [
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
    ];
  
    it('Retorna a lista completa de sales!', async function () {
      sinon.stub(modelsSales, 'getAllSales').returns(resultStub);
      const result = await servicesSales.getSales();
      expect(result.status).to.be.equal('SUCCESS');
    });
  
    it('Retorna um sale!', async function () {
      sinon.stub(modelsSales, 'getSalesById').resolves([{
        date,
        productId: 1,
        quantity: 5,
      }, {
        date,
        productId: 2,
        quantity: 10,
      }]);
      const result = await servicesSales.getSalesById(1);
      expect(result.status).to.be.equal('SUCCESS');
      expect(result.data).to.be.have.length(2);
    });
  
    it('Não retorna sale!', async function () {
      sinon.stub(modelsSales, 'getSalesById').resolves([]);
      const result = await servicesSales.getSalesById(123);
      expect(result.status).to.be.equal('NOT_FOUND');
    });

    it('Insert sale!', async function () {
      sinon.stub(modelsSales, 'insertSale').resolves(3);
      sinon.stub(modelsSales, 'insertSaleProduct').resolves([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]);

      const result = await servicesSales.insertSale([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]);
      expect(result.status).to.be.equal('CREATED');
    });
  });
}); 