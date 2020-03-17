import React from 'react';
import { useSelector } from 'react-redux';
import { getIsEditingTransactions } from '../../state/ui/selectors';
import { makeGetTransaction } from '../../state/transactions/selectors';
import { makeSelectBudgetMonth } from '../../state/budgets/selectors';
import { getMonthNameShort } from '../../util/date';
import TransactionDetails from './TransactionDetails';
import styles from './transaction.module.css';
import { Budget } from '../../types/budget';
import TransactionInput from './TransactionInput';

interface Props {
  id: Budget.Id;
}

export default function Transaction(props: Props) {
  const { id } = props;

  const isEditingTransactions = useSelector(getIsEditingTransactions);
  const transaction = useSelector(makeGetTransaction(id));
  const month = useSelector(makeSelectBudgetMonth(transaction ? transaction.budget_id : 0));

  if (!transaction) return null;

  if (isEditingTransactions) return <TransactionInput id={id} hideCategorySelect />;

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
