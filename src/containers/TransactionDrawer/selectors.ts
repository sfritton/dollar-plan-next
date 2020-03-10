import { makeGetBudget } from '../../state/budgets/selectors';
import { AppState, Status } from '../../state/types';
import { makeGetGroup } from '../../state/groups/selectors';
import { Budget } from '../../types/budget';
import { makeGetCategory } from '../../state/categories/selectors';

export const makeGetCategoryOptions = (budgetId: number | string) => (state: AppState) => {
  const budget = makeGetBudget(budgetId)(state);

  if (!budget || budget.status !== Status.SUCCESS) return undefined;

  const groups = [...budget.incomeIds, ...budget.expenseIds].reduce<Budget.GroupResponse[]>((acc, id) => {
    const group = makeGetGroup(id)(state);

    if (!group) return acc;

    return [...acc, group];
  }, []);

  return groups.map(group => ({
    title: group.title,
    categories: group.categoryIds.reduce<Pick<Budget.Group, 'title' | 'id'>[]>((acc, id) => {
      const category = makeGetCategory(id)(state);

      if (!category) return acc;

      return [...acc, { title: category.title, id }];
    }, []),
  }));
};
