import jwt from 'jsonwebtoken';

export const generateToken = (data: any, expiration: string) =>
  jwt.sign(data, "secret-token", {
    expiresIn: expiration,
  });

export const tokenOrderValidation = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'No token provided.' });
  token = token.replace(/^Bearer\s+/, '');
  jwt.verify(token, "secret-token", (err, decoded) => {
    if (err)
      return res
        .status(500)
        .json({ message: 'Failed to authenticate order token' });
    req.params.orderId = decoded.orderId;
    next();
  });
};
