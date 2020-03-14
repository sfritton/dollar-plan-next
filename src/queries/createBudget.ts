import { Budget } from '../types/budget';
import { PostgresId } from './types';
import db from './database';

export async function createBudget(budget: Omit<Budget.Budget, 'id'>) {
  return await db.one<PostgresId>(
    `
      INSERT INTO budgets(month, year)
      VALUES( $[month], $[year])
      RETURNING id;
    `,
    budget,
  );
}
