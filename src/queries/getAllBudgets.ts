import { Budget } from '../types/budget';
import db from './database';

export async function getAllBudgets() {
  console.log({ db });
  return await db.any<Budget.Budget>(
    `
      SELECT *
      FROM budgets
      ORDER BY year DESC, month DESC
    `,
  );
}
