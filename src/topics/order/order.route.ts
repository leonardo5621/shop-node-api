import express from 'express';
import { OrderController } from './order.controller';
import { routerTo } from '../../helpers/router_error_handler';
import { tokenOrderValidation } from '../../helpers/auth';

const router = express.Router();

router.post('/', routerTo(OrderController.openOrder));

router.put(
  '/:orderId',
  routerTo(OrderController.updatePreOrder),
);

router.post(
  '/complete',
  routerTo(OrderController.completeOrder),
);

router.get(
  '/confirmed/:orderCode',
  routerTo(OrderController.getOrderByCode),
);


export default router;
