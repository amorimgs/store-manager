const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const controlersSales = require('../../../src/controllers/controlersSales');
const controlersProducts = require('../../../src/controllers/controlersProducts');
const servicesProducts = require('../../../src/services/servicesProducts');
const servicesSales = require('../../../src/services/servicesSales');

const { expect } = chai;

chai.use(sinonChai);

describe('Testando Controlers', function () {
  afterEach(function () {
    sinon.restore();
  });
 
  describe('Testando Products', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Retorna a lista completa de products!', async function () {
      const data = [
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
      const req = {
      };
      const res = {
        // status: sinon.stub().returns(res),
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
      sinon.stub(servicesProducts, 'getProducts').resolves({
        status: 'SUCCESS',
        data,
      });
      await controlersProducts.getProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(data);
    });
    it('Retorna product pelo ID!', async function () {
      const data = {
        id: 1,
        name: 'Martelo de Thor',
      };
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        // status: sinon.stub().returns(res),
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
      sinon.stub(servicesProducts, 'getProductsById').resolves({
        status: 'SUCCESS',
        data,
      });
      await controlersProducts.getProductsById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(data);
    });
    it('Não retorna product!', async function () {
      const req = {
        params: {
          id: 1123,
        },
      };
      const res = {
        // status: sinon.stub().returns(res),
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
      sinon.stub(servicesSales, 'getSalesById').resolves({
        status: 'NOT_FOUND',
        data: {
          message: 'Product not found',
        },
      });
      await controlersProducts.getProductsById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });
  describe('Testando Sales', function () {
    it('Retorna a lista completa de sales!', async function () {
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
      const req = {
      };
      const res = {
        // status: sinon.stub().returns(res),
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
      sinon.stub(servicesSales, 'getSales').resolves({
        status: 'SUCCESS',
        data: resultStub,
      });
      await controlersSales.getSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(resultStub);
    });
    it('Retorna sale pelo ID!', async function () {
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
      ];
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        // status: sinon.stub().returns(res),
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
      sinon.stub(servicesSales, 'getSalesById').resolves({
        status: 'SUCCESS',
        data: resultStub,
      });
      await controlersSales.getSalesById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(resultStub);
    });
    it('Não retorna sale!', async function () {
      const res = {
        // status: sinon.stub().returns(res),
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
      const req = {
        params: {
          id: 1123,
        },
      };
      sinon.stub(servicesSales, 'getSalesById').resolves({
        status: 'NOT_FOUND',
        data: { message: 'Sale not found' },
      });
      await controlersSales.getSalesById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
});