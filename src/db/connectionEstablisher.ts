import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  createConnection,
  getConnectionManager,
} from 'typeorm';
import dotenvSafe from 'dotenv-safe';

dotenvSafe.config();

export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(name: string): Promise<Connection> {
    const CONNECTION_NAME: string = name;
    let connection: Connection;
    const hasConnection = this.connectionManager.has(CONNECTION_NAME);
    if (hasConnection) {
      connection = this.connectionManager.get(CONNECTION_NAME);
      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {
      const connectionOptions: ConnectionOptions = {
        type: 'postgres',
        url: process.env.DATABASE_URL_TEST,
        synchronize: false,
        logging: false,
        entities: [process.env.TYPEORM_ENTITY_PATH],
        migrations: [process.env.TYPEORM_MIGRATION_PATH],
        subscribers: ['./src/subscriber/**/*.ts'],
        cli: {
          migrationsDir: './src/db/migrations',
        },
      };
      connection = await createConnection(connectionOptions);
    }
    return connection;
  }
}
