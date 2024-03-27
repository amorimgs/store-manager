const sinon = require('sinon');
const chai = require('chai');
const middleware = require('../../../src/middlewares/myMiddlewares');

const { expect } = chai;

describe('Testando Middlewares', function () {
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