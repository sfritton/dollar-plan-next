import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAction } from '../../state/hooks';
import { getIsTransactionDrawerOpen } from '../../state/ui/selectors';
import Drawer from '../../components/Drawer';
import Footer from './Footer';
import uiSlice from '../../state/ui/slice';
import transactionsSlice from '../../state/transactions/slice';
import TransactionInput from './TransactionInput';
import styles from './transaction-drawer.module.css';
import { ButtonSecondary } from '../../components/Button';
import uniqueId from '../../util/uniqueId';
import useBudgetId from '../../hooks/useBudgetId';
import useBudget from '../../hooks/useBudget';

function TransactionDrawer() {
  const isOpen = useSelector(getIsTransactionDrawerOpen);
  const budgetId = useBudgetId();
  const budget = useBudget();

  const closeDrawerAction = useAction(uiSlice.actions.closeTransactionDrawer);
  const createTransaction = useAction(transactionsSlice.actions.createIndependentTransaction);
  const [transactions, setTransactions] = useState<string[]>([]);

  const closeDrawer = useCallback(() => {
    closeDrawerAction();
    setTransactions([]);
  }, [closeDrawerAction, setTransactions]);

  const addTransaction = useCallback(() => {
    if (!budget) return;

    const id = uniqueId('transaction');
    createTransaction({ id, budgetId, date: { month: budget.month, year: budget.year } });
    setTransactions(prevTransactions => [...prevTransactions, id]);
  }, [setTransactions, budgetId, budget, createTransaction]);

  const removeTransaction = useCallback(
    (id: string) =>
      setTransactions(prevTransactions => prevTransactions.filter(prevId => prevId !== id)),
    [setTransactions],
  );

  // add a transaction when the drawer first opens
  useEffect(() => {
    if (!isOpen) return;

    addTransaction();
  }, [isOpen, addTransaction]);

  return (
    <Drawer title="Add transactions" isOpen={isOpen} onClose={closeDrawer} Footer={Footer}>
      {transactions.map(id => (
        <TransactionInput key={id} removeTransaction={removeTransaction} id={id} />
      ))}
      <ButtonSecondary onClick={addTransaction} className={styles.addAnother}>
        Add another
      </ButtonSecondary>
    </Drawer>
  );
}

export default TransactionDrawer;
