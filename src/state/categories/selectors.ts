import { AppState } from '../types';
import { Budget } from '../../types/budget';

export const makeGetCategory = (id: Budget.Id) => (state: AppState) => state.categories[id];

export const makeGetActualAmount = (id: Budget.Id) => (state: AppState) => {
  const category = makeGetCategory(id)(state);

  if (!category) return 0;

  return category.actual_amount;
};

export const makeGetPlannedAmount = (id: Budget.Id) => (state: AppState) => {
  const category = makeGetCategory(id)(state);

  if (!category) return 0;

  return category.planned_amount;
};
