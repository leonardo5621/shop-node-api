module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [process.env.TYPEORM_ENTITY_PATH],
  migrations: [process.env.TYPEORM_MIGRATION_PATH],
  subscribers: ['./src/subscriber/**/*.ts'],
  cli: {
    migrationsDir: './src/db/migrations',
  },
};
