import { createSelector } from '@reduxjs/toolkit';
import { AppState, Status } from '../types';
import { BudgetWithMetadata } from './slice';
import { makeGetGroup, makeGetActualAmount, makeGetPlannedAmount } from '../groups/selectors';
import { StateGroup } from '../groups/types';
import { makeGetCategory } from '../categories/selectors';
import { Budget } from '../../types/budget';

export const getStatus = (state: AppState) => state.budgets.status;

export const makeGetBudgetStatus = (id: string) => (state: AppState) =>
  (state.budgets.idMap[id] || {}).status;

export const getBudgetIds = (state: AppState) => state.budgets.ids;

export const getHasBudgets = (state: AppState) => getBudgetIds(state).length > 0;

export const makeGetBudget = (budgetId: Budget.Id) => (state: AppState) =>
  state.budgets.idMap[budgetId];

export const makeSelectBudgetMonth = (budgetId: Budget.Id) =>
  createSelector(makeGetBudget(budgetId), budget => {
    if (!budget) return undefined;
    return budget.month;
  });

export const selectBudgets = createSelector(
  getBudgetIds,
  (state: AppState) => state.budgets.idMap,
  (ids, idMap) =>
    ids.reduce((acc: BudgetWithMetadata[], id) => {
      const budget = idMap[id];
      if (!budget) return acc;

      return [...acc, budget];
    }, []),
);

export const makeGetActualBalance = (budgetId: Budget.Id) => (state: AppState) => {
  const budget = makeGetBudget(budgetId)(state);

  if (!budget || budget.status !== Status.SUCCESS) return undefined;

  const totalIncome = budget.incomeIds.reduce<number>(
    (sum, id) => sum + makeGetActualAmount(id)(state),
    0,
  );
  const totalExpenses = budget.expenseIds.reduce<number>(
    (sum, id) => sum + makeGetActualAmount(id)(state),
    0,
  );

  return totalIncome - totalExpenses;
};

export const makeGetPlannedBalance = (budgetId: Budget.Id) => (state: AppState) => {
  const budget = makeGetBudget(budgetId)(state);

  if (!budget || budget.status !== Status.SUCCESS) return undefined;

  const totalIncome = budget.incomeIds.reduce<number>(
    (sum, id) => sum + makeGetPlannedAmount(id)(state),
    0,
  );
  const totalExpenses = budget.expenseIds.reduce<number>(
    (sum, id) => sum + makeGetPlannedAmount(id)(state),
    0,
  );

  return totalIncome - totalExpenses;
};

export const makeGetIsBalanced = (budgetId: Budget.Id) => (state: AppState) => {
  const balance = makeGetPlannedBalance(budgetId)(state);

  if (typeof balance === 'undefined') return undefined;

  return balance === 0;
};

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
