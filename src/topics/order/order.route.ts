import express from 'express';
import { OrderController } from './order.controller';
import { routerTo } from '../../helpers/router_error_handler';
import { tokenOrderValidation } from '../../helpers/auth';

const router = express.Router();

router.post('/', routerTo(OrderController.openOrder));

router.post(
  '/complete-order',
  tokenOrderValidation,
  routerTo(OrderController.completeOrder),
);

router.get(
  '/confirmed/:orderCode',
  routerTo(OrderController.getOrderByCode),
);

router
  .get(
    '/:orderId',
    tokenOrderValidation,
    routerTo(OrderController.getSingleOrder),
  )
  .put(
    '/:orderId',
    tokenOrderValidation,
    routerTo(OrderController.updatePreOrder),
  );

export default router;
