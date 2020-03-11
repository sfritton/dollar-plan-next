import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { makeGetBudget } from '../../state/budgets/selectors';
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

interface Props {
  budgetId: string;
}

function Header(props: Props) {
  const { budgetId } = props;
  const getBudget = useMemo(() => makeGetBudget(budgetId), [budgetId]);

  const budget = useSelector(getBudget);
  const isAdjustingBudget = useSelector(getIsAdjustingBudget);
  const setIsAdjustingBudget = useAction(uiSlice.actions.setIsAdjustingBudget);

  return (
    <>
      <div className={styles.header}>
        {budget && (
          <>
            {isAdjustingBudget ? (
              <ButtonWithIcon Icon={IconClose} label="Cancel" onClick={() => setIsAdjustingBudget(false)} />
            ) : (
              <BudgetDrawer budgetId={budgetId} />
            )}
            <h1 className={styles.title}>
              {getMonthName(budget.month)} {budget.year}
            </h1>
            {isAdjustingBudget ? (
              <ButtonWithIcon Icon={IconSave} label="Save changes" onClick={() => setIsAdjustingBudget(false)} />
            ) : (
              <ButtonWithIcon Icon={IconAdjust} label="Adjust budget" onClick={() => setIsAdjustingBudget(true)} />
            )}
          </>
        )}
      </div>
      <SubHeader budget={budget} />
    </>
  );
}

export default Header;
