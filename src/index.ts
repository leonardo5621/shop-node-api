import 'reflect-metadata';
import './db/connect';
import 'module-alias/register';
import 'source-map-support/register';
import express from 'express';
import cors from 'cors';
import orderRoutes from './topics/order/order.route';
import { BackError } from './helpers/back_error';

const app = express();

app.use(express.json());
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

app.get('/', (req, res) => res.json({ hello: 'world' }));

const port = 3333;

app.listen(port, () => {
  console.log('app listening at port %s', port);
});
