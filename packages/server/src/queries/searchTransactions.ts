import { PostgresDB } from '../types';

export async function searchTransactions(db: PostgresDB, searchTerm: string) {
  return await db.any<Budget.Transaction>(
    `
      SELECT *
      FROM transactions
      WHERE description LIKE $[searchTerm]
      ORDER BY budget_id, group_id, category_id, date
    `,
    { searchTerm },
  );
}
