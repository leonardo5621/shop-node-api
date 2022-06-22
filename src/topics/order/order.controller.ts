import { Request, Response } from 'express';
import { transactionContext } from '../../helpers/transactions';
import { OrderService } from './order.service';

export class OrderController {
  static async getSingleOrder(req: Request, res: Response) {
    const { orderId } = req.params;
    const order = await transactionContext(async transactionManager =>
      OrderService.getOrderById(parseInt(orderId, 10), transactionManager),
    );
    return res.json({ ...order });
  }

  static async getOrderByCode(req: Request, res: Response) {
    const { orderCode } = req.params;
    const order = await transactionContext(async transactionManager =>
      OrderService.getOrderByCode(orderCode, transactionManager),
    );
    return res.json({ ...order });
  }

  static async openOrder(req: Request, res: Response) {
    const { body } = req;
    const response = await transactionContext(async transactionManager =>
      OrderService.openOrder(body, transactionManager),
    );
    return res.json({ ...response });
  }

  static async completeOrder(req: Request, res: Response) {
    const { orderId, ...orderClientDetails } = req.body;
    const orderCode = await transactionContext(async transactionManager =>
      OrderService.completeOrder(
        orderId,
        orderClientDetails,
        transactionManager,
      ),
    );
    return res.json({ orderCode });
  }

  static async updatePreOrder(req: Request, res: Response) {
    const { orderId } = req.params;
    const modifiedOrderId = await transactionContext(async transactionManager =>
      OrderService.updatePreOrder(orderId, req.body, transactionManager),
    );
    return res.json({ orderId: modifiedOrderId });
  }
}
