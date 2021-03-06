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

  static async getOrder(req: Request, res: Response) {
    const { orderId } = req.params;
    const order = await transactionContext(async transactionManager =>
      OrderService.getOrderByCode(orderId, transactionManager),
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
    const { orderId, ...paymentDetails } = req.body;
    const { ok } = await transactionContext(async transactionManager =>
      OrderService.completeOrder(
        orderId,
        paymentDetails,
        transactionManager,
      ),
    );
    return res.json({ ok });
  }

  static async updatePreOrder(req: Request, res: Response) {
    const { orderId } = req.params;
    const modifiedOrderId = await transactionContext(async transactionManager =>
      OrderService.updatePreOrder(orderId, req.body, transactionManager),
    );
    return res.json({ orderId: modifiedOrderId });
  }
}
