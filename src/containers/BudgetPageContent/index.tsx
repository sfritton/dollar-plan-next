import React from 'react';
import uiSlice from '../../state/ui/slice';
import { ButtonFloatingAction, ButtonPrimary } from '../../components/Button';
import IconAdd from '../../icons/IconAdd';
import Group from '../Group';
import styles from './budget-page-content.module.css';
import { BudgetWithMetadata } from '../../state/budgets/slice';
import { Status } from '../../state/types';
import CategoryDrawer from '../CategoryDrawer';
import TransactionDrawer from '../TransactionDrawer';
import { useAction } from '../../state/hooks';
import { useSelector } from 'react-redux';
import { getIsAdjustingBudget } from '../../state/ui/selectors';

interface Props {
  budget?: BudgetWithMetadata;
}

function BudgetPageContent(props: Props) {
  const { budget } = props;

  const isAdjustingBudget = useSelector(getIsAdjustingBudget);
  const openDrawer = useAction(uiSlice.actions.openTransactionDrawer);

  if (!budget || budget.status !== Status.SUCCESS) return null;

  return (
    <div className={styles.container}>
      <section>
        <h2>Income</h2>
        {budget.incomeIds.map(id => (
          <Group groupId={id} key={id} noTitle={budget.incomeIds.length === 1} />
        ))}
        {isAdjustingBudget && <ButtonPrimary onClick={() => {}}>Add an income group</ButtonPrimary>}
      </section>
      <section>
        <h2>Expenses</h2>
        {budget.expenseIds.map(id => (
          <Group groupId={id} key={id} />
        ))}
        {isAdjustingBudget && <ButtonPrimary onClick={() => {}}>Add an expense group</ButtonPrimary>}
      </section>
      {!isAdjustingBudget && <ButtonFloatingAction Icon={IconAdd} label="Add transactions" onClick={openDrawer} />}
      <CategoryDrawer />
      <TransactionDrawer />
    </div>
  );
}

export default BudgetPageContent;
