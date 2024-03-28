const servicesProducts = require('../services/servicesProducts');

const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) {
    return res.status(STATUS_CODE.BAD_REQUEST)
      .json({ message: '"name" is required' });
  } 
  if (name.length < 5) { 
    return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).json(
      { message: '"name" length must be at least 5 characters long' },
    );
  }
  return next();
};

const validateProductId = async (req, res, next) => {
  const sales = req.body;
  
  const notProductId = sales.some((sale) => sale.productId === undefined);
  if (notProductId) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({ message: '"productId" is required' });
  }

  const products = await servicesProducts.getProducts();
  const verifyId = sales.every((p) => products.data.map((el) => el.id).includes(p.productId));
  if (!verifyId) {
    return res.status(STATUS_CODE.NOT_FOUND).json({ message: 'Product not found' });
  }
  
  return next();
};

const validateQuantity = (req, res, next) => {
  const sales = req.body;

  const notQuantity = sales.some((sale) => sale.quantity === undefined);

  if (notQuantity) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({ message: '"quantity" is required' });
  }
  const lengthValidate = sales.some((sale) => sale.quantity <= 0);

  if (lengthValidate) {
    return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

module.exports = { validateName,
  validateProductId,
  validateQuantity };