import React, { useCallback } from 'react';
import IconSave from '../../icons/IconSave';
import { ButtonPrimary } from '../../components/Button';
import uiSlice from '../../state/ui/slice';
import { useAction } from '../../state/hooks';
import { useSelector } from 'react-redux';
import { getIsEditingTransactions } from '../../state/ui/selectors';
import IconEdit from '../../icons/IconEdit';
import styles from '../../components/Drawer/drawer.module.css';
import saveTransactionsAction from '../../state/budgets/saveTransactions';
import useBudgetId from '../../hooks/useBudgetId';

const Footer: React.FC = () => {
  const budgetId = useBudgetId();
  const isEditingTransactions = useSelector(getIsEditingTransactions);
  const setIsEditingTransactions = useAction(uiSlice.actions.setIsEditingTransactions);
  const saveTransactions = useAction(saveTransactionsAction);

  const handleSave = useCallback(() => {
    saveTransactions(budgetId);
    setIsEditingTransactions(false);
  }, [budgetId, saveTransactions, setIsEditingTransactions]);

  if (isEditingTransactions)
    return (
      <ButtonPrimary className={styles.footerButton} onClick={handleSave}>
        <IconSave className={styles.footerIcon} /> Save
      </ButtonPrimary>
    );

  return (
    <ButtonPrimary className={styles.footerButton} onClick={() => setIsEditingTransactions(true)}>
      <IconEdit className={styles.footerIcon} /> Edit transactions
    </ButtonPrimary>
  );
};

export default Footer;
