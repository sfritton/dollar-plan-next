import { AppState } from '../types';
import {
  makeGetActualAmount as makeGetCategoryActualAmount,
  makeGetPlannedAmount as makeGetCategoryPlannedAmount,
} from '../categories/selectors';
import { Budget } from '../../types/budget';

export const makeGetGroup = (id: Budget.Id) => (state: AppState) => state.groups[id];

export const makeGetActualAmount = (id: Budget.Id) => (state: AppState) => {
  const group = makeGetGroup(id)(state);

  if (!group) return 0;

  return group.categoryIds.reduce<number>(
    (sum, categoryId) => sum + makeGetCategoryActualAmount(categoryId)(state),
    0,
  );
};

export const makeGetPlannedAmount = (id: Budget.Id) => (state: AppState) => {
  const group = makeGetGroup(id)(state);

  if (!group) return 0;

  return group.categoryIds.reduce<number>(
    (sum, categoryId) => sum + makeGetCategoryPlannedAmount(categoryId)(state),
    0,
  );
};
