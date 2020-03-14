import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styles from './budget-drawer.module.css';
import { makeGetBudget } from '../../../state/budgets/selectors';
import { getMonthName } from '../../../util/date';
import { Budget } from '../../../types/budget';

interface Props {
  id: Budget.Id;
  isCurrent?: boolean;
  onClick: AnyFunction;
}

export default function BudgetButton(props: Props) {
  const { id, isCurrent, onClick } = props;

  const budget = useSelector(makeGetBudget(id));

  if (!budget) return null;

  return (
    <li>
      <Link href={`/budget/${id}`}>
        <a className={styles.button} onClick={onClick}>
          {getMonthName(budget.month)} {budget.year} {isCurrent && <span className={styles.currentLabel}>current</span>}
        </a>
      </Link>
    </li>
  );
}
