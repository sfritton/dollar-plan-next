import arrayToMap from '../util/arrayToMap';
import { PostgresDB } from '../types';

export async function getBudgetQuery(db: PostgresDB, id: string) {
  return await db.one<Budget.Budget>(
    `
      SELECT *
      FROM budgets
      WHERE id = $[id]
    `,
    { id },
  );
}

export async function getBudgetGroupsQuery(db: PostgresDB, id: string) {
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

export async function getBudgetCategoriesQuery(db: PostgresDB, id: string) {
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

export async function getBudgetTransactionsQuery(db: PostgresDB, id: string) {
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

export async function getBudgetById(db: PostgresDB, id: string): Promise<Budget.BudgetResponse> {
  const [budget, groupList, categoryList, transactionList] = await Promise.all([
    getBudgetQuery(db, id),
    getBudgetGroupsQuery(db, id),
    getBudgetCategoriesQuery(db, id),
    getBudgetTransactionsQuery(db, id),
  ] as const);

  const groups = arrayToMap(groupList.map(group => ({ ...group, categoryIds: [] })));
  const categories = arrayToMap(
    categoryList.map(category => ({ ...category, transactionIds: [], actual_amount: 0 })),
  );
  const transactions = arrayToMap(transactionList);

  for (const transaction of transactionList) {
    categories[transaction.category_id].transactionIds.push(transaction.id);
    categories[transaction.category_id].actual_amount += transaction.amount;
  }

  for (const category of categoryList) {
    groups[category.group_id].categoryIds.push(category.id);
  }

  Object.keys(groups).forEach(groupId => {
    groups[groupId].categoryIds.sort((a, b) => categories[a].sort - categories[b].sort);
  });

  const { incomeIds, expenseIds } = groupList.reduce<{ incomeIds: number[]; expenseIds: number[] }>(
    (acc, { id, is_income }) => ({
      incomeIds: is_income ? [...acc.incomeIds, id] : acc.incomeIds,
      expenseIds: is_income ? acc.expenseIds : [...acc.expenseIds, id],
    }),
    { incomeIds: [], expenseIds: [] },
  );

  return {
    ...budget,
    incomeIds: incomeIds.sort((a, b) => groups[a].sort - groups[b].sort),
    expenseIds: expenseIds.sort((a, b) => groups[a].sort - groups[b].sort),
    groups,
    categories,
    transactions,
  };
}
