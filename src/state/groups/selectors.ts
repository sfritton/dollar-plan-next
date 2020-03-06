import { AppState } from '../types';
import {
  makeGetActualAmount as makeGetCategoryActualAmount,
  makeGetPlannedAmount as makeGetCategoryPlannedAmount,
} from '../categories/selectors';

export const makeGetGroup = (id: number) => (state: AppState) => state.groups[id];

export const makeGetActualAmount = (id: number) => (state: AppState) => {
  const group = makeGetGroup(id)(state);

  if (!group) return 0;

  return group.categoryIds.reduce((sum, categoryId) => sum + makeGetCategoryActualAmount(categoryId)(state), 0);
};

export const makeGetPlannedAmount = (id: number) => (state: AppState) => {
  const group = makeGetGroup(id)(state);

  if (!group) return 0;

  return group.categoryIds.reduce((sum, categoryId) => sum + makeGetCategoryPlannedAmount(categoryId)(state), 0);
};
