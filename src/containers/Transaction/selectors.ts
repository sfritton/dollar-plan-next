import { makeGetBudget } from '../../state/budgets/selectors';
import { AppState, Status } from '../../state/types';
import { makeGetGroup } from '../../state/groups/selectors';
import { makeGetCategory } from '../../state/categories/selectors';
import { StateGroup } from '../../state/groups/types';
import { Budget } from '../../types/budget';

export const makeGetCategoryOptions = (budgetId: Budget.Id) => (state: AppState) => {
  const budget = makeGetBudget(budgetId)(state);

  if (!budget || budget.status !== Status.SUCCESS) return undefined;

  const groups = [...budget.incomeIds, ...budget.expenseIds].reduce<StateGroup[]>((acc, id) => {
    const group = makeGetGroup(id)(state);

    if (!group) return acc;

    return [...acc, group];
  }, []);

  return groups.map(group => ({
    id: group.id,
    title: group.title,
    categories: group.categoryIds.reduce<{ title: string; id: Budget.Id }[]>((acc, id) => {
      const category = makeGetCategory(id)(state);

      if (!category) return acc;

      return [...acc, { title: category.title, id }];
    }, []),
  }));
};
