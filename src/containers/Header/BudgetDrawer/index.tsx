import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getStatus, getBudgetIds } from '../../../state/budgets/selectors';
import IconCalendar from '../../../icons/IconCalendar';
import { ButtonWithIcon } from '../../../components/Button';
import Drawer from '../../../components/Drawer';
import fetchBudgetsAction from '../../../state/budgets/fetchBudgets';
import { Status } from '../../../state/types';
import styles from './budget-drawer.module.css';
import BudgetButton from './BudgetButton';
import Footer from './Footer';
import { useAction } from '../../../state/hooks';

interface Props {
  budgetId: string;
}

function BudgetDrawer(props: Props) {
  const { budgetId } = props;

  const budgetIds = useSelector(getBudgetIds);
  const status = useSelector(getStatus);

  const [isOpen, setIsOpen] = useState(false);

  const fetchBudgets = useAction(fetchBudgetsAction);

  useEffect(() => {
    if (status === Status.INIT) {
      fetchBudgets();
    }
  }, [status, fetchBudgets]);

  return (
    <>
      <ButtonWithIcon Icon={IconCalendar} label="Switch budget" onClick={() => setIsOpen(true)} />
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        side="left"
        title="Choose a budget"
        Footer={Footer}
      >
        <ul className={styles.budgetDrawer}>
          {budgetIds.map(id => (
            <BudgetButton
              id={id}
              key={id}
              isCurrent={String(id) === budgetId}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </ul>
      </Drawer>
    </>
  );
}

export default BudgetDrawer;
