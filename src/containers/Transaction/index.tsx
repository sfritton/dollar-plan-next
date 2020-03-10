import React from 'react';
import { useSelector } from 'react-redux';
import { makeGetTransaction } from '../../state/transactions/selectors';
import { makeSelectBudgetMonth } from '../../state/budgets/selectors';
import { getMonthNameShort } from '../../util/date';
import TransactionDetails from './TransactionDetails';
import styles from './transaction.module.css';

interface Props {
  id: number;
}

export default function Transaction(props: Props) {
  const { id } = props;

  const transaction = useSelector(makeGetTransaction(id));
  const month = useSelector(makeSelectBudgetMonth(transaction ? transaction.budget_id : 0));

  if (!transaction) return null;

  const monthName = getMonthNameShort(month || 0);
  const date = `${monthName} ${transaction.date}`;

  return (
    <li>
      <div className={styles.transaction}>
        <div className={styles.date}>{date}</div>
        <TransactionDetails description={transaction.description} amount={transaction.amount} />
      </div>
    </li>
  );
}
