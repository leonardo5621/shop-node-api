module.exports = {
  type: 'postgres',
  url: 'postgres://root:password@localhost:5423/shop-node-api',
  synchronize: false,
  logging: false,
  entities: ['./src/orm/**/*.model.ts'],
  migrations: ['./src/db/migrations/*.ts'],
  subscribers: ['./src/subscriber/**/*.ts'],
  cli: {
    migrationsDir: './src/db/migrations',
  },
};
