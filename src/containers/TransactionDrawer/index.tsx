import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAction } from '../../state/hooks';
import { getIsTransactionDrawerOpen } from '../../state/ui/selectors';
import Drawer from '../../components/Drawer';
import Footer from './Footer';
import uiSlice from '../../state/ui/slice';
import createIndependentTransaction from '../../state/transactions/createIndependentTransaction';
import TransactionInput from '../Transaction/TransactionInput';
import styles from './transaction-drawer.module.css';
import { ButtonSecondary } from '../../components/Button';
import uniqueId from '../../util/uniqueId';
import useBudgetId from '../../hooks/useBudgetId';
import useBudget from '../../hooks/useBudget';
import transactionsSlice from '../../state/transactions/slice';

function TransactionDrawer() {
  const isOpen = useSelector(getIsTransactionDrawerOpen);
  const budgetId = useBudgetId();
  const budget = useBudget();

  const closeDrawerAction = useAction(uiSlice.actions.closeTransactionDrawer);
  const createTransaction = useAction(createIndependentTransaction);
  const resetTransactions = useAction(transactionsSlice.actions.resetTransactions);
  const [transactions, setTransactions] = useState<string[]>([]);

  const closeDrawer = useCallback(() => {
    closeDrawerAction();
    setTransactions([]);
    resetTransactions();
  }, [closeDrawerAction, setTransactions, resetTransactions]);

  const addTransaction = useCallback(() => {
    if (!budget) return;

    const id = uniqueId('transaction');
    createTransaction({ id, budgetId, date: { month: budget.month, year: budget.year } });
    setTransactions(prevTransactions => [...prevTransactions, id]);
  }, [setTransactions, budgetId, budget, createTransaction]);

  // add a transaction when the drawer first opens
  useEffect(() => {
    if (!isOpen) return;

    addTransaction();
  }, [isOpen, addTransaction]);

  return (
    <Drawer
      title="Add transactions"
      isOpen={isOpen}
      onClose={closeDrawer}
      Footer={props => <Footer {...props} onSave={closeDrawer} />}
    >
      <ul>
        {transactions.map(id => (
          <TransactionInput key={id} id={id} />
        ))}
      </ul>
      <ButtonSecondary onClick={addTransaction} className={styles.addAnother}>
        Add another
      </ButtonSecondary>
    </Drawer>
  );
}

export default TransactionDrawer;
