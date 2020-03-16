import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { makeGetBudget } from '../state/budgets/selectors';
import useBudgetId from './useBudgetId';

const useBudget = () => {
  const budgetId = useBudgetId();
  const getBudget = useMemo(() => makeGetBudget(budgetId), [budgetId]);

  return useSelector(getBudget);
};

export default useBudget;
