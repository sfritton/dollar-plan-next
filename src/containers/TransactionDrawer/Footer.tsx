import React, { useCallback } from 'react';
import { ButtonPrimary } from '../../components/Button';
import IconSave from '../../icons/IconSave';
import { useAction } from '../../state/hooks';
import styles from '../../components/Drawer/drawer.module.css';
import useBudgetId from '../../hooks/useBudgetId';
import saveTransactionsAction from '../../state/budgets/saveTransactions';

interface Props {
  onSave: () => void;
}

const Footer: React.FC<Props> = ({ onSave }) => {
  const budgetId = useBudgetId();
  const saveTransactions = useAction(saveTransactionsAction);

  const handleSave = useCallback(() => {
    saveTransactions(budgetId);
    onSave();
  }, [budgetId, saveTransactions, onSave]);

  return (
    <ButtonPrimary className={styles.footerButton} onClick={handleSave}>
      <IconSave className={styles.footerIcon} /> Save
    </ButtonPrimary>
  );
};

export default Footer;
