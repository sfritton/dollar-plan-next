import { AppState } from '../types';
import { makeGetTransaction } from '../transactions/selectors';
import { Budget } from '../../types/budget';

export const makeGetCategory = (id: Budget.Id) => (state: AppState) => state.categories[id];

export const makeGetActualAmount = (id: Budget.Id) => (state: AppState) => {
  const category = makeGetCategory(id)(state);

  if (!category) return 0;

  const transactions = category.transactionIds.map(id => makeGetTransaction(id)(state));

  return transactions.reduce((sum, transaction) => sum + (transaction ? transaction.amount : 0), 0);
};

export const makeGetPlannedAmount = (id: Budget.Id) => (state: AppState) => {
  const category = makeGetCategory(id)(state);

  if (!category) return 0;

  return category.planned_amount;
};
