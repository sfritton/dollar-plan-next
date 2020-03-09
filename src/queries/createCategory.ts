import { Budget } from '../types/budget';
import { ID } from './types';
import db from './database';

export async function createCategory(category: Omit<Budget.Category, 'id'>) {
  return await db.one<ID>(
    `
      INSERT INTO categories(budget_id, title, group_id, planned_amount, notes, sort)
      VALUES( $[budget_id], $[title], $[group_id], $[planned_amount], $[notes], $[sort])
      RETURNING id;
    `,
    category,
  );
}