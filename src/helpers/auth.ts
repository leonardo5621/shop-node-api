import jwt from 'jsonwebtoken';

export const generateToken = (data: any, expiration: string) =>
  jwt.sign(data, "secret-token", {
    expiresIn: expiration,
  });
