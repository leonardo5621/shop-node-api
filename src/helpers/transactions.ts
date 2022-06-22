import { EntityManager, getConnection } from 'typeorm';
import { BackError } from './back_error';

export const transactionContext = async (
  serviceMethod: (transactionManager: EntityManager) => any,
) => {
  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const data = await serviceMethod(queryRunner.manager);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return data;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    throw new BackError(error.message, error.httpCode ?? null);
  }
};
