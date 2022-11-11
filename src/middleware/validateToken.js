const { verify } = require('jsonwebtoken');
const { CustomError } = require('../helpers');

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new CustomError('Authorization header not provided.', 400, 'Provide token');
    }

    if (!req.headers.authorization.startsWith('Bearer')) {
      throw new CustomError('Invalid token type.', 400, 'Provide valid token');
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedData = verify(token, process.env.JWT_SECRET_KEY);

    req.user = decodedData;
    next();
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
    }
    next(new CustomError('Unable to validate token', 400, `${error.message}`));
  }
};
