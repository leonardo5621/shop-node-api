import 'reflect-metadata';
import './db/connect';
import 'module-alias/register';
import 'source-map-support/register';
import express from 'express';
import cors from 'cors';
import dotenvSafe from 'dotenv-safe';
import orderRoutes from './topics/order/order.route';
import { BackError } from './helpers/back_error';

dotenvSafe.config();

const app = express();

app.use(cors());
app.use('/order', orderRoutes);
app.use((err: BackError, req, res, next) => {
  if (!err.httpCode) {
    err.httpCode = 500;
  }
  console.log(err.message);
  res.status(err.httpCode).json({
    error: err.message,
  });
});

// eslint-disable-next-line arrow-body-style
app.get('/', (req, res) => {
  return res.json({ hello: 'world' });
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log('app listening at port %s', port);
});
