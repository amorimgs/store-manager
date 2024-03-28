const sinon = require('sinon');
const chai = require('chai');
const middleware = require('../../../src/middlewares/myMiddlewares');
const servicesProducts = require('../../../src/services/servicesProducts');

const { expect } = chai;

describe('Testando Middlewares', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Testando ValidateName', function () {
    it('Verifica se existe Nome', async function () {
      const req = {
        body: {
          name: 'Produ',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
  
      const next = sinon.stub().returns();
  
      middleware.validateName(req, res, next); 
  
      expect(next).to.have.been.calledWith();
    }); 
    it('Verifica se não existe Nome', async function () {
      const req = {
        body: {
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
  
      const next = sinon.stub().returns();
  
      middleware.validateName(req, res, next); 
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
    it('Verifica se nome tem pelo menos 5 letras', async function () {
      const req = {
        body: {
          name: 'Test',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
  
      const next = sinon.stub().returns();
  
      middleware.validateName(req, res, next); 
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });
  describe('Testando ValidateProductId', function () {
    it('Verifica se está tudo certo', async function () {
      const req = {
        body: [
          {
            productId: 1,
          },
          {
            productId: 2,
          },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
      sinon.stub(servicesProducts, 'getProducts').resolves({
        data: [{ id: 1 }, { id: 2 }] });

      const next = sinon.stub().returns();
  
      await middleware.validateProductId(req, res, next); 
      expect(next).to.have.been.calledWith();
    });
    it('Verifica não tem productId', async function () {
      const req = {
        body: [
          {
            quantity: 1,
          },
          {
            quantity: 2,
          },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
      
      const next = sinon.stub().returns();
  
      await middleware.validateProductId(req, res, next); 
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('Verifica se não existe um product com o id passado', async function () {
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 5,
            quantity: 3,
          },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
      
      const next = sinon.stub().returns();
      sinon.stub(servicesProducts, 'getProducts').resolves({
        data: [{ id: 1 }, { id: 2 }] });

      await middleware.validateProductId(req, res, next); 
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('Testando validateQuantity', function () {
    it('Verifica se está tudo certo', function () {
      const req = {
        body: [
          {
            quantity: 1,

          },
          {
            quantity: 1,

          },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };

      const next = sinon.stub().returns();
      middleware.validateQuantity(req, res, next); 
      expect(next).to.have.been.calledWith();
    });
  
    it('Verifica não tem quantify', function () {
      const req = {
        body: [
          {

          },
          {

          },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
      
      const next = sinon.stub().returns();
  
      middleware.validateQuantity(req, res, next); 
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('Verifica se quantify é menor que 1', function () {
      const req = {
        body: [
          {
            productId: 1,
            quantity: 0,
          },
          {
            productId: 5,
            quantity: 3,
          },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(), 
      };
      
      const next = sinon.stub().returns();

      middleware.validateQuantity(req, res, next); 
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
  });
});