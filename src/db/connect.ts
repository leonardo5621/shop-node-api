import { createConnection } from 'typeorm';

createConnection()
  .then()
  .catch(error => console.log(error));
