const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
};

const validateName = async (req, res, next) => {
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

module.exports = { validateName };