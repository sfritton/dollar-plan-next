import React from 'react';
import { useSelector } from 'react-redux';
import { Budget } from '../../types/budget';
import { getMonthNameShort, getLastDayOfMonth } from '../../util/date';
import { Select, InputText, InputCent } from '../../components/Input';
import CategorySelect from './CategorySelect';
import { ButtonWithIcon } from '../../components/Button';
import IconDelete from '../../icons/IconDelete';
import styles from './transaction-drawer.module.css';
import transactionsSlice from '../../state/transactions/slice';
import { makeGetTransaction } from '../../state/transactions/selectors';
import useBudget from '../../hooks/useBudget';
import { useAction } from '../../state/hooks';

const dates = [...new Array(31)].map((_, index) => index + 1);

export interface TempTransaction {
  id: string;
  category_id?: Budget.Transaction['category_id'];
  amount?: Budget.Transaction['amount'];
  date?: Budget.Transaction['date'];
  description?: Budget.Transaction['description'];
}

interface Props {
  id: string;
}

const TransactionInput: React.FC<Props> = ({ id }) => {
  const budget = useBudget();
  const transaction = useSelector(makeGetTransaction(id));

  // actions
  const updateDate = useAction(transactionsSlice.actions.updateDate);
  const updateAmount = useAction(transactionsSlice.actions.updateAmount);
  const updateCategory = useAction(transactionsSlice.actions.updateCategory);
  const updateDescription = useAction(transactionsSlice.actions.updateDescription);
  const deleteTransaction = useAction(transactionsSlice.actions.deleteTransaction);

  if (!budget || !transaction) return null;

  const { month, year } = budget;
  const monthName = getMonthNameShort(month || 0);
  const lastDay = getLastDayOfMonth({ month, year }).getDate();

  return (
    <div className={styles.inputCard}>
      <div className={styles.inputCardInputs}>
        <div className={styles.inputCardFirstRow}>
          <Select
            label="Date"
            value={String(transaction.date)}
            onChange={date => updateDate({ id, date: Number(date) })}
            className={styles.dateInput}
          >
            {dates.slice(0, lastDay).map(date => (
              <option key={date} value={date}>
                {monthName} {date}
              </option>
            ))}
          </Select>
          <InputCent
            label="Amount"
            value={transaction.amount}
            onChange={amount => updateAmount({ id, amount })}
            className={styles.amountInput}
          />
        </div>
        <CategorySelect
          value={String(transaction.category_id)}
          onChange={categoryId => updateCategory({ id, categoryId })}
        />
        <InputText
          label="Description"
          value={transaction.description}
          onChange={description => updateDescription({ id, description })}
          className={styles.descriptionInput}
        />
      </div>
      <ButtonWithIcon
        className={styles.deleteButton}
        onClick={() => deleteTransaction({ id })}
        Icon={IconDelete}
        label="Delete transaction"
      />
    </div>
  );
};

export default TransactionInput;
