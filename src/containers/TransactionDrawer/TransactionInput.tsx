import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Budget } from '../../types/budget';
import { makeGetBudget } from '../../state/budgets/selectors';
import { getMonthNameShort, getLastDayOfMonth, getClosestToToday } from '../../util/date';
import { Select, InputText, InputCent } from '../../components/Input';
import CategorySelect from './CategorySelect';
import { ButtonWithIcon } from '../../components/Button';
import IconDelete from '../../icons/IconDelete';
import styles from './transaction-drawer.module.css';

const dates = [...new Array(31)].map((_, index) => index + 1);

export interface TempTransaction {
  tempId: string;
  category_id?: Budget.Transaction['category_id'];
  amount?: Budget.Transaction['amount'];
  date?: Budget.Transaction['date'];
  description?: Budget.Transaction['description'];
}

interface Props {
  removeTransaction: (id: string) => void;
  tempId: string;
}

const TransactionInput: React.FC<Props> = ({ removeTransaction, tempId }) => {
  const router = useRouter();
  const rawId = router.query.id;
  const budgetId = Array.isArray(rawId) ? '' : rawId;

  const budget = useSelector(makeGetBudget(Number(budgetId)));

  const removeCallback = useCallback(() => {
    removeTransaction(tempId);
  }, [removeTransaction, tempId]);

  if (!budget) return null;

  const { month, year } = budget;
  const monthName = getMonthNameShort(month || 0);
  const lastDay = getLastDayOfMonth({ month, year }).getDate();
  const closestDate = getClosestToToday({ month, year }).getDate();

  return (
    <div className={styles.inputCard}>
      <div className={styles.inputCardInputs}>
        <div className={styles.inputCardFirstRow}>
          <Select label="Date" defaultValue={closestDate} className={styles.dateInput}>
            {dates.slice(0, lastDay).map(date => (
              <option key={date} value={date}>
                {monthName} {date}
              </option>
            ))}
          </Select>
          <InputCent label="Amount" className={styles.amountInput} />
        </div>
        <CategorySelect />
        <InputText label="Description" className={styles.descriptionInput} />
      </div>
      <ButtonWithIcon
        className={styles.deleteButton}
        onClick={removeCallback}
        Icon={IconDelete}
        label="Delete transaction"
      />
    </div>
  );
};

export default TransactionInput;
