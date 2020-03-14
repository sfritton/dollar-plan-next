import React from 'react';
import IconSave from '../../icons/IconSave';
import { ButtonPrimary } from '../../components/Button';
import uiSlice from '../../state/ui/slice';
import { useAction } from '../../state/hooks';
import { useSelector } from 'react-redux';
import { getIsEditingTransactions } from '../../state/ui/selectors';
import IconEdit from '../../icons/IconEdit';

const editTransactionsAction = () => uiSlice.actions.setIsEditingTransactions(true);

const saveTransactionsAction = () => uiSlice.actions.setIsEditingTransactions(false);

const Footer: React.FC = () => {
  const isEditingTransactions = useSelector(getIsEditingTransactions);
  const editTransactions = useAction(editTransactionsAction);
  const saveTransactions = useAction(saveTransactionsAction);

  if (isEditingTransactions)
    return (
      <ButtonPrimary className="budget-drawer--footer" onClick={saveTransactions}>
        <IconSave className="budget-drawer--footer-icon" /> Save
      </ButtonPrimary>
    );

  return (
    <ButtonPrimary className="budget-drawer--footer" onClick={editTransactions}>
      <IconEdit className="budget-drawer--footer-icon" /> Edit transactions
    </ButtonPrimary>
  );
};

export default Footer;
