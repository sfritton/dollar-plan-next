import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getStatus, getBudgetIds } from '../../../state/budgets/selectors';
import Drawer from '../../../components/Drawer';
import fetchBudgetsAction from '../../../state/budgets/fetchBudgets';
import { Status } from '../../../state/types';
import styles from './budget-drawer.module.css';
import BudgetButton from './BudgetButton';
import Footer from './Footer';
import { useAction } from '../../../state/hooks';
import useBudgetId from '../../../hooks/useBudgetId';

interface Props {
  isOpen: boolean;
  onClose: AnyFunction;
}

const BudgetDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const budgetId = useBudgetId();

  const budgetIds = useSelector(getBudgetIds);
  const status = useSelector(getStatus);

  const fetchBudgets = useAction(fetchBudgetsAction);

  useEffect(() => {
    if (status === Status.INIT) {
      fetchBudgets();
    }
  }, [status, fetchBudgets]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="left" title="Budgets" Footer={Footer}>
      <ul className={styles.budgetDrawer}>
        {budgetIds.map(id => (
          <BudgetButton id={id} key={id} isCurrent={String(id) === budgetId} onClick={onClose} />
        ))}
      </ul>
    </Drawer>
  );
};

export default BudgetDrawer;
