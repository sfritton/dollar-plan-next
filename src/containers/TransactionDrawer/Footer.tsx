import React, { useCallback } from 'react';
import { ButtonPrimary } from '../../components/Button';
import IconSave from '../../icons/IconSave';
import { useAction } from '../../state/hooks';
import uiSlice from '../../state/ui/slice';
import styles from '../../components/Drawer/drawer.module.css';
import useBudgetId from '../../hooks/useBudgetId';
import saveTransactionsAction from '../../state/budgets/saveTransactions';

const Footer: React.FC = () => {
  const budgetId = useBudgetId();
  const closeDrawer = useAction(uiSlice.actions.closeTransactionDrawer);
  const saveTransactions = useAction(saveTransactionsAction);

  const handleSave = useCallback(() => {
    saveTransactions(budgetId);
    closeDrawer();
  }, [budgetId, saveTransactions, closeDrawer]);

  return (
    <ButtonPrimary className={styles.footerButton} onClick={handleSave}>
      <IconSave className={styles.footerIcon} /> Save
    </ButtonPrimary>
  );
};

export default Footer;
