import _ from 'lodash';
import { Order, OrderProducts, PaymentOrder, Product, Email } from '../../orm';
import { EntityManager } from 'typeorm';
import { BackError } from '../../helpers/back_error';
import { generateToken } from '../../helpers/auth';
import { ShopService } from '../shop/shop.service';
import { OrderStatus } from '../../orm/order/order.model';

export class OrderService {
  static async completeOrder(
    orderId: number,
    paymentDetails,
    transactionalEntityManager: EntityManager,
  ) {
    try {
      await OrderService.managePayment(orderId, paymentDetails, transactionalEntityManager);
  
      await OrderService.notifyOrderEmail(orderId, transactionalEntityManager);
      await transactionalEntityManager
        .createQueryBuilder(Order, 'o')
        .update(Order)
        .set({ orderStatus: OrderStatus.AWAITING_DELIVERY })
        .where({ id: orderId })
        .execute();
    } catch (error) {
      throw new BackError(
        `Failed to update the order: ${error.message}`,
        500,
      );
    }
    return { ok: true };
  }

  static async managePayment(
    orderId: number,
    paymentDetails,
    manager: EntityManager,
  ) {
    //
    //RUN Payment details validation here
    return manager.insert(PaymentOrder, {
      orderId,
    });
  }

  static async notifyOrderEmail(
    orderId: number,
    manager: EntityManager,
  ) {
    const order = await manager
      .createQueryBuilder(Order, 'o')
      .where({ id: orderId })
      .getOne();
    return manager.insert(Email, {
      sendTo: order.clientEmail,
      bodyText: 'Congratulations! your order has been confirmed',
      sentFrom: 'shop_api@node.com'
    })
  }

  static async getOrderByCode(
    orderCode: string,
    transactionalEntityManager: EntityManager,
  ) {
    return transactionalEntityManager
      .createQueryBuilder(Order, 'o')
      .innerJoinAndSelect('o.shop', 's')
      .innerJoinAndSelect('o.orderProducts', 'op')
      .innerJoinAndSelect('op.products', 'prods')
      .where({ orderCode })
      .getOne();
  }

  static async getOrderById(
    orderId: number,
    transactionalEntityManager: EntityManager,
  ) {
    return transactionalEntityManager
      .createQueryBuilder(Order, 'o')
      .where({ id: orderId })
      .getOne();
  }

  static async openOrder(order, transactionalEntityManager: EntityManager) {
    const { shopId, productsRelation } = order;
    const productIds = _.map(productsRelation, 'productId');
    const shopFound = await ShopService.checkShopIdIsValid(
      shopId,
      transactionalEntityManager,
    );
    if (!shopFound) {
      throw new BackError(
        'Shop not found',
        400
      )
    };
    const validProducts = await ShopService.getShopProducts(
      transactionalEntityManager,
      shopId,
      productIds,
    );
    if (validProducts.length !== productIds.length) {
      throw new BackError(
        'The specified products are not available',
        400,
      );
    }
    const calculatedPrice = OrderService.orderPrice(
      productsRelation,
      validProducts,
    );
    const createdOrder = await transactionalEntityManager.insert(
      Order,
      _.omit({ ...order, price: calculatedPrice }, ['productsRelation']),
    );
    const { id: orderId } = _.head<{ id: number }>(createdOrder.identifiers);
    const orderProducts = _.map(productsRelation, pr => ({
      ...pr,
      orderId,
    }));
    await transactionalEntityManager.insert(OrderProducts, orderProducts);
    const token = generateToken({ orderId }, '2h');
    return { orderId, token };
  }

  static async updatePreOrder(orderId, orderPayload, manager: EntityManager) {
    const order = await manager
      .createQueryBuilder(Order, 'o')
      .where({ id: orderId, orderStatus: OrderStatus.OPEN })
      .getOne();
    if (_.isNil(order)) {
      throw new BackError(`Order not found`, 400);
    }
    const { productsRelation } = orderPayload;
    const productIds = _.map(productsRelation, 'productId');
    const validProducts = await ShopService.getShopProducts(
      manager,
      order.shopId,
      productIds,
    );
    if (validProducts.length !== productIds.length) {
      throw new BackError(
        'The especified products are not available',
        400,
      );
    }
    const calculatedPrice = OrderService.orderPrice(
      productsRelation,
      validProducts,
    );

    await manager
      .createQueryBuilder(OrderProducts, 'op')
      .softDelete()
      .where({ orderId })
      .execute();
    await manager
      .createQueryBuilder()
      .update(Order)
      .set({
        price: calculatedPrice,
      })
      .where({ id: orderId })
      .execute();
    const orderProducts = _.map(productsRelation, pr => ({
      ...pr,
      orderId,
    }));
    await manager.insert(OrderProducts, orderProducts);
    return orderId;
  }

  static orderPrice(
    productsRelation: { productId: number; quantity: number }[],
    products: Product[],
  ): number {
    const productsById = _.groupBy(products, 'id');
    return _.reduce(
      productsRelation,
      (acc, pr) => {
        const { price } = _.head<Product>(productsById[pr.productId]);
        return acc + price * pr.quantity;
      },
      0,
    );
  }

  static async updateOrderStatus(
    orderId,
    nextStatus: OrderStatus,
    manager: EntityManager,
  ) {
    return manager
      .createQueryBuilder()
      .update(Order)
      .set({
        orderStatus: nextStatus,
      })
      .where({ id: orderId })
      .returning(['id', 'order_status'])
      .execute();
  }

  static async getProductsByOrderId(orderId: number, manager: EntityManager) {
    return manager
      .createQueryBuilder(OrderProducts, 'op')
      .innerJoinAndSelect('op.products', 'p')
      .where({ orderId })
      .getMany();
  }
}
