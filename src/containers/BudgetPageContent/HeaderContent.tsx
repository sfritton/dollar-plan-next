import React from 'react';
import { useSelector } from 'react-redux';
import { getDaysLeftMessage, useBalanceMessage } from './util';
import useBudgetId from '../../hooks/useBudgetId';
import useBudget from '../../hooks/useBudget';
import { makeGetIsBalanced } from '../../state/budgets/selectors';
import styles from './budget-page-content.module.css';
import classNames from '../../util/classNames';
import { Status } from '../../state/types';

const HeaderContent: React.FC = () => {
  const budgetId = useBudgetId();
  const budget = useBudget();
  const balanceMessage = useBalanceMessage(budgetId);
  const isBalanced = useSelector(makeGetIsBalanced(budgetId));

  if (budget?.status !== Status.SUCCESS) return null;

  return (
    <div className={classNames({ [styles.isBalanced]: isBalanced }, styles.headerContent)}>
      <span className={classNames({ [styles.isBalanced]: isBalanced }, styles.balanceMessage)}>
        {balanceMessage}
      </span>
      {isBalanced && budget && <span>{getDaysLeftMessage(budget)}</span>}
    </div>
  );
};

export default HeaderContent;
