import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getMonthName } from '../../util/date';
import SubHeader from './SubHeader';
import styles from './header.module.css';
import IconAdjust from '../../icons/IconAdjust';
import { ButtonWithIcon } from '../../components/Button';
import BudgetDrawer from './BudgetDrawer';
import uiSlice from '../../state/ui/slice';
import { getIsAdjustingBudget } from '../../state/ui/selectors';
import IconClose from '../../icons/IconClose';
import IconSave from '../../icons/IconSave';
import { useAction } from '../../state/hooks';
import useBudget from '../../hooks/useBudget';
import saveBudgetAction from '../../state/budgets/saveBudget';
import fetchBudgetAction from '../../state/budgets/fetchBudget';
import useBudgetId from '../../hooks/useBudgetId';
import groupsSlice from '../../state/groups/slice';
import categoriesSlice from '../../state/categories/slice';

function Header() {
  const budgetId = useBudgetId();
  const budget = useBudget();
  const isAdjustingBudget = useSelector(getIsAdjustingBudget);
  const setIsAdjustingBudget = useAction(uiSlice.actions.setIsAdjustingBudget);
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

  return (
    <>
      <div className={styles.header}>
        {budget && (
          <>
            {isAdjustingBudget ? (
              <ButtonWithIcon Icon={IconClose} label="Cancel" onClick={handleCancel} />
            ) : (
              <BudgetDrawer />
            )}
            <h1 className={styles.title}>
              {getMonthName(budget.month)} {budget.year}
            </h1>
            {isAdjustingBudget ? (
              <ButtonWithIcon Icon={IconSave} label="Save changes" onClick={handleSave} />
            ) : (
              <ButtonWithIcon
                Icon={IconAdjust}
                label="Adjust budget"
                onClick={() => setIsAdjustingBudget(true)}
              />
            )}
          </>
        )}
      </div>
      <SubHeader />
    </>
  );
}

export default Header;
