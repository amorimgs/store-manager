const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const servicesProducts = require('../../../src/services/servicesProducts');
const app = require('../../../src/app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testando Controlers Products', function () {
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
    sinon.stub(servicesProducts, 'getProducts').returns({ status: 'SUCCESS', data: resultStub });
    const response = await chai
      .request(app)
      .get('/products');
    expect(response.status).to.be.equals(200);
  });

  it('Retorna um products!', async function () {
    sinon.stub(servicesProducts, 'getProductsById').resolves({ 
      status: 'SUCCESS',
      data: {
        id: 1,
        name: 'Martelo de Thor',
      } });
    const response = await chai
      .request(app)
      .get('/products/1');
    expect(response.status).to.be.equals(200);
  });

  it('Não retorna products!', async function () {
    sinon.stub(servicesProducts, 'getProductsById').resolves({ 
      status: 'NOT_FOUND',
      data: {
        message: 'Product not found',
      } });
    const response = await chai
      .request(app)
      .get('/products/123');
    expect(response.status).to.be.equals(404);
  });
}); 