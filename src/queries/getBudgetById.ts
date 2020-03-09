import { Budget } from '../types/budget';
import arrayToMap from '../util/arrayToMap';
import db from './database';

export async function getBudgetQuery(id: string) {
  return await db.one<Budget.Budget>(
    `
      SELECT *
      FROM budgets
      WHERE id = $[id]
    `,
    { id },
  );
}

export async function getBudgetGroupsQuery(id: string) {
  return await db.any<Budget.Group>(
    `
      SELECT *
      FROM groups
      WHERE budget_id = $[id]
      ORDER BY sort
    `,
    { id },
  );
}

export async function getBudgetCategoriesQuery(id: string) {
  return await db.any<Budget.Category>(
    `
      SELECT *
      FROM categories
      WHERE budget_id = $[id]
      ORDER BY sort
    `,
    { id },
  );
}

export async function getBudgetTransactionsQuery(id: string) {
  return await db.any<Budget.Transaction>(
    `
      SELECT *
      FROM transactions
      WHERE budget_id = $[id]
      ORDER BY date
    `,
    { id },
  );
}

export async function getBudgetById(id: string): Promise<Budget.BudgetResponse> {
  const [budget, groupList, categoryList, transactionList] = await Promise.all([
    getBudgetQuery(id),
    getBudgetGroupsQuery(id),
    getBudgetCategoriesQuery(id),
    getBudgetTransactionsQuery(id),
  ] as const);

  const groups = arrayToMap(
    groupList.map<Budget.GroupResponse>(group => ({ ...group, categoryIds: [] })),
  );
  const categories = arrayToMap(
    categoryList.map<Budget.CategoryResponse>(category => ({ ...category, transactionIds: [] })),
  );
  const transactions = arrayToMap(transactionList);

  for (const transaction of transactionList) {
    categories[transaction.category_id].transactionIds.push(transaction.id);
  }

  for (const category of categoryList) {
    groups[category.group_id].categoryIds.push(category.id);
  }
  const { incomeIds, expenseIds } = groupList.reduce(
    (acc: { incomeIds: number[]; expenseIds: number[] }, { id, is_income }) => ({
      incomeIds: is_income ? [...acc.incomeIds, id] : acc.incomeIds,
      expenseIds: is_income ? acc.expenseIds : [...acc.expenseIds, id],
    }),
    { incomeIds: [], expenseIds: [] },
  );

  return {
    ...budget,
    incomeIds,
    expenseIds,
    groups,
    categories,
    transactions,
  };
}
