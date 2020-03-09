import { Budget } from '../types/budget';
import db from './database';

export async function getCategories() {
  return await db.any<Budget.Category>(
    `
      SELECT *
      FROM categories
      ORDER BY budget_id, group_id
    `,
  );
}
