import { PostgresDB, ID } from '../types';

export async function createTransaction(
  db: PostgresDB,
  transaction: Omit<Budget.Transaction, 'id'>,
) {
  return await db.one<ID>(
    `
      INSERT INTO transactions(budget_id, group_id, category_id, amount, date, description)
      VALUES($[budget_id], $[group_id], $[category_id], $[amount], $[date], $[description])
      RETURNING id;
    `,
    transaction,
  );
}
