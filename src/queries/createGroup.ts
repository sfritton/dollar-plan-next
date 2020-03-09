import { Budget } from '../types/budget';
import { ID } from './types';
import db from './database';

export async function createGroup(group: Omit<Budget.Group, 'id'>) {
  return await db.one<ID>(
    `
      INSERT INTO groups(budget_id, title, is_income, sort)
      VALUES( $[budget_id], $[title], $[is_income], $[sort])
      RETURNING id;
    `,
    group,
  );
}
