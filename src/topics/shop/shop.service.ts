import _ from 'lodash';
import { EntityManager, getConnection } from 'typeorm';
import { Shop, Product } from '../../orm';

export class ShopService {
  static async checkShopIdIsValid(
    shopId: number,
    manager: EntityManager,
  ): Promise<boolean> {
    const shopCount = await manager.findOne(Shop, shopId);
    return !_.isNil(shopCount);
  }

  static async getShopProducts(
    manager: EntityManager,
    shopId: number,
    productIds: number[],
  ): Promise<Product[]> {
    const { products } = await manager
      .createQueryBuilder(Shop, 's')
      .where({ id: shopId })
      .innerJoinAndSelect('s.products', 'p', 'p.id IN (:...productIds)', {
        productIds,
      })
      .getOne();
    return products;
  }

  static async getProductsByShopId(shopId: number) {
    const shopRep = await getConnection().getRepository(Shop);
    return shopRep
      .createQueryBuilder('s')
      .select([
        's.id',
        's.mapLink',
        's.name',
        's.address',
      ])
      .leftJoinAndSelect('s.products', 'p')
      .where({ id: shopId })
      .getOne();
  }
}
