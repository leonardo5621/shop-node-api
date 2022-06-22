import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

createConnection()
  .then()
  .catch(error => console.log(error));
