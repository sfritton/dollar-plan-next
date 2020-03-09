import { Budget } from '../types/budget';
import db from './database';

export async function getGroups() {
  return await db.any<Budget.Group>(
    `
      SELECT *
      FROM groups
      ORDER BY budget_id
    `,
  );
}
