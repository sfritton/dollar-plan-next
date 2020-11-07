import React, { useCallback } from 'react';
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
import uniqueId from '../../util/uniqueId';
import useIsAdjustingBudget from '../../hooks/useIsAdjustingBudget';
import IconAdjust from '../../icons/IconAdjust';
import IconClose from '../../icons/IconClose';
import IconSave from '../../icons/IconSave';
import saveBudgetAction from '../../state/budgets/saveBudget';
import fetchBudgetAction from '../../state/budgets/fetchBudget';
import groupsSlice from '../../state/groups/slice';
import categoriesSlice from '../../state/categories/slice';
import useBudgetId from '../../hooks/useBudgetId';

interface Props {
  budget?: BudgetWithMetadata;
}

function BudgetPageContent(props: Props) {
  const { budget } = props;

  const [isAdjustingBudget, setIsAdjustingBudget] = useIsAdjustingBudget();
  const openDrawer = useAction(uiSlice.actions.openTransactionDrawer);
  const addGroup = useAction(budgetsSlice.actions.addGroup);

  const budgetId = useBudgetId();
  const saveBudget = useAction(saveBudgetAction);
  const fetchBudget = useAction(fetchBudgetAction);
  const resetGroups = useAction(groupsSlice.actions.resetGroups);
  const resetCategories = useAction(categoriesSlice.actions.resetCategories);

  const handleCancel = useCallback(() => {
    setIsAdjustingBudget(false);
    fetchBudget(budgetId);
    resetGroups();
    resetCategories();
  }, [setIsAdjustingBudget, fetchBudget, resetGroups, resetCategories, budgetId]);

  const handleSave = useCallback(() => {
    setIsAdjustingBudget(false);
    saveBudget(budgetId);
  }, [setIsAdjustingBudget, saveBudget, budgetId]);

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
            <ButtonPrimary
              onClick={() =>
                addGroup({ budget_id: budget.id, is_income: true, id: uniqueId('group') })
              }
            >
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
            <ButtonPrimary
              onClick={() =>
                addGroup({ budget_id: budget.id, is_income: false, id: uniqueId('group') })
              }
            >
              Add an expense group
            </ButtonPrimary>
          </div>
        )}
      </section>
      {isAdjustingBudget ? (
        <>
          <ButtonFloatingAction
            Icon={IconClose}
            label="Cancel"
            side="left"
            onClick={handleCancel}
          />
          <ButtonFloatingAction
            Icon={IconSave}
            label="Save budget"
            side="right"
            onClick={handleSave}
          />
        </>
      ) : (
        <>
          <ButtonFloatingAction
            Icon={IconAdjust}
            label="Adjust budget"
            side="left"
            onClick={() => setIsAdjustingBudget(true)}
          />
          <ButtonFloatingAction
            Icon={IconAdd}
            label="Add transactions"
            side="right"
            onClick={openDrawer}
          />
        </>
      )}
      <CategoryDrawer />
      <TransactionDrawer />
    </div>
  );
}

export default BudgetPageContent;
