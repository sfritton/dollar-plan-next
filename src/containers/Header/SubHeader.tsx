import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from '../../util/classNames';
import { hasMonthStarted, hasMonthEnded, getDaysLeft } from '../../util/date';
import { BudgetWithMetadata } from '../../state/budgets/slice';
import { makeGetActualBalance, makeGetPlannedBalance, makeGetIsBalanced } from '../../state/budgets/selectors';
import styles from './header.module.css';
import { getDollarString } from '../../util/currency';
import { getIsAdjustingBudget } from '../../state/ui/selectors';

const getDaysLeftMessage = (budget: BudgetWithMetadata) => {
  const date = { month: budget.month, year: budget.year };
  if (!hasMonthStarted(date)) {
    return 'Month has not started';
  }

  if (hasMonthEnded(date)) {
    return 'Month has ended';
  }

  return `${getDaysLeft(date)} days left`;
};

const useBalanceMessage = (budgetId: string) => {
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

interface Props {
  budget?: BudgetWithMetadata;
}

function SubHeader(props: Props) {
  const { budget } = props;
  const router = useRouter();
  const rawId = router.query.id;
  const budgetId = Array.isArray(rawId) ? '' : rawId;

  const balanceMessage = useBalanceMessage(budgetId);
  const isBalanced = useSelector(makeGetIsBalanced(budgetId));

  if (!budget) return <div className={styles.subheader} />;

  return (
    <div className={classNames({ [styles.subheaderUnbalanced]: isBalanced === false }, styles.subheader)}>
      <span>{balanceMessage}</span>
      {isBalanced && <span>{getDaysLeftMessage(budget)}</span>}
    </div>
  );
}

export default SubHeader;
