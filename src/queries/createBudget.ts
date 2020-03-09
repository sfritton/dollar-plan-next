import { Budget } from '../types/budget';
import { ID } from './types';
import db from './database';

export async function createBudget(budget: Omit<Budget.Budget, 'id'>) {
  return await db.one<ID>(
    `
      INSERT INTO budgets(month, year)
      VALUES( $[month], $[year])
      RETURNING id;
    `,
    budget,
  );
}
