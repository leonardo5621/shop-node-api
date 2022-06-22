import _ from 'lodash';
import { Product, Shop } from '../../orm';
import { MigrationInterface, QueryRunner } from "typeorm";

const productsList = [
  {
    name: "Product 1",
    description: `Product 1 is a product
    `,
    price: 7.5,
    stockQuantity: 10,
  },
  {
    name: "Product 2",
    description: `Product 2 is a product
    `,
    price: 20,
    stockQuantity: 5,
  },
  {
    name: "Product 3",
    description: `Product 3 is a product
    `,
    price: 4,
    stockQuantity: 3,
  },
];

export class dbSetup1655932774606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const createdShop = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Shop)
      .values({
        name: `Node Store`,
        address: 'Dummy Street, United States',
      })
      .execute();

    const { id: shopId } = _.head<{ id: number }>(createdShop.identifiers);

    const { identifiers } = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsList)
      .execute();
    const productIds = _.map(identifiers, 'id');
    productIds.forEach(async id => {
      await queryRunner.manager
        .createQueryBuilder()
        .relation(Shop, 'products')
        .of(shopId)
        .add(id);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
