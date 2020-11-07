import { useSelector } from 'react-redux';
import { hasMonthStarted, hasMonthEnded, getDaysLeft } from '../../util/date';
import { BudgetWithMetadata } from '../../state/budgets/slice';
import { makeGetActualBalance, makeGetPlannedBalance } from '../../state/budgets/selectors';
import { getDollarString } from '../../util/currency';
import { getIsAdjustingBudget } from '../../state/ui/selectors';
import { Budget } from '../../types/budget';

export const getDaysLeftMessage = (budget: BudgetWithMetadata) => {
  const date = { month: budget.month, year: budget.year };
  if (!hasMonthStarted(date)) {
    return 'Month has not started';
  }

  if (hasMonthEnded(date)) {
    return 'Month has ended';
  }

  return `${getDaysLeft(date)} days left`;
};

export const useBalanceMessage = (budgetId: Budget.Id) => {
  const isAdjustingBudget = useSelector(getIsAdjustingBudget);
  const plannedBalance = useSelector(makeGetPlannedBalance(budgetId)) || 0;
  const actualBalance = useSelector(makeGetActualBalance(budgetId)) || 0;

  if (plannedBalance < 0) {
    return `Reduce planned expenses by $${getDollarString(plannedBalance * -1)} to balance`;
  }

  if (plannedBalance > 0) {
    return `Increase planned expenses by $${getDollarString(plannedBalance)} to balance`;
  }

  if (isAdjustingBudget) {
    return 'Budget is balanced';
  }

  if (actualBalance < 0) {
    return 'Balance: -$' + getDollarString(actualBalance * -1);
  }

  return 'Balance: $' + getDollarString(actualBalance);
};
