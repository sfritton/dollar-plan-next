import { Budget } from '../types/budget';
import db from './database';

export async function getTransactions() {
  return await db.any<Budget.Transaction>(
    `
      SELECT *
      FROM transactions
      ORDER BY budget_id, group_id, category_id
    `,
  );
}
