import React from 'react';
import uiSlice from '../../state/ui/slice';
import { ButtonFloatingAction, ButtonPrimary } from '../../components/Button';
import IconAdd from '../../icons/IconAdd';
import Group from '../Group';
import styles from './budget-page-content.module.css';
import budgetsSlice, { BudgetWithMetadata } from '../../state/budgets/slice';
import { Status } from '../../state/types';
import CategoryDrawer from '../CategoryDrawer';
import TransactionDrawer from '../TransactionDrawer';
import { useAction } from '../../state/hooks';
import { useSelector } from 'react-redux';
import { getIsAdjustingBudget } from '../../state/ui/selectors';
import uniqueId from '../../util/uniqueId';

interface Props {
  budget?: BudgetWithMetadata;
}

function BudgetPageContent(props: Props) {
  const { budget } = props;

  const isAdjustingBudget = useSelector(getIsAdjustingBudget);
  const openDrawer = useAction(uiSlice.actions.openTransactionDrawer);
  const addGroup = useAction(budgetsSlice.actions.addGroup);

  if (!budget || budget.status !== Status.SUCCESS) return null;

  return (
    <div className={styles.container}>
      <section>
        <h2>Income</h2>
        {budget.incomeIds.map(id => (
          <Group groupId={id} key={id} noTitle={budget.incomeIds.length === 1} />
        ))}
        {isAdjustingBudget && (
          <div className={styles.addButton}>
            <ButtonPrimary onClick={() => addGroup({ budget_id: budget.id, is_income: true, id: uniqueId('group') })}>
              Add an income group
            </ButtonPrimary>
          </div>
        )}
      </section>
      <section>
        <h2>Expenses</h2>
        {budget.expenseIds.map(id => (
          <Group groupId={id} key={id} />
        ))}
        {isAdjustingBudget && (
          <div className={styles.addButton}>
            <ButtonPrimary onClick={() => addGroup({ budget_id: budget.id, is_income: false, id: uniqueId('group') })}>
              Add an expense group
            </ButtonPrimary>
          </div>
        )}
      </section>
      {!isAdjustingBudget && <ButtonFloatingAction Icon={IconAdd} label="Add transactions" onClick={openDrawer} />}
      <CategoryDrawer />
      <TransactionDrawer />
    </div>
  );
}

export default BudgetPageContent;
