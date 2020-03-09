import { BudgetLegacy } from '../types/budgetLegacy';
import { createBudget } from './createBudget';
import { createGroup } from './createGroup';
import { createCategory } from './createCategory';
import { createTransaction } from './createTransaction';

export async function saveLegacyBudget(budget: BudgetLegacy.Budget) {
  // save the budget
  const { id: budget_id } = await createBudget(budget.date);

  await Promise.all(
    Object.entries(budget.categoryGroups).map(async ([key, group], sort) => {
      const is_income = key === 'income';
      // save each group
      const { id: group_id } = await createGroup({
        budget_id,
        title: group.title,
        is_income,
        sort,
      });

      return await Promise.all(
        Object.values(group.categories).map(async (category, sort) => {
          // save each category
          const { id: category_id } = await createCategory({
            budget_id,
            group_id,
            title: category.title,
            planned_amount: category.plannedAmount,
            notes: category.notes ?? '',
            sort,
          });

          return await Promise.all(
            Object.values(category.transactions).map(transaction =>
              // save each transaction
              createTransaction({
                budget_id,
                group_id,
                category_id,
                amount: transaction.amount,
                description: transaction.description,
                date: transaction.date,
              }),
            ),
          );
        }),
      );
    }),
  );

  return budget_id;
}
