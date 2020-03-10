import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAction } from '../../state/hooks';
import { getIsTransactionDrawerOpen } from '../../state/ui/selectors';
import Drawer from '../../components/Drawer';
import Footer from './Footer';
import uiSlice from '../../state/ui/slice';
import TransactionInput from './TransactionInput';
import styles from './transaction-drawer.module.css';
import { ButtonSecondary } from '../../components/Button';
import useCounter from './useCounter';

const initialTransactions = ['temp_0'];

function TransactionDrawer() {
  const isOpen = useSelector(getIsTransactionDrawerOpen);
  const closeDrawerAction = useAction(uiSlice.actions.closeTransactionDrawer);
  const [nextId, increaseId] = useCounter(1);
  const [transactions, setTransactions] = useState(initialTransactions);

  const closeDrawer = useCallback(() => {
    closeDrawerAction();
    setTransactions(initialTransactions);
  }, [closeDrawerAction, setTransactions]);

  const addTransaction = useCallback(() => {
    setTransactions(prevTransactions => [...prevTransactions, `temp_${nextId}`]);
    increaseId();
  }, [setTransactions, increaseId, nextId]);

  const removeTransaction = useCallback(
    (id: string) =>
      // TODO: actually delete the temp transaction
      setTransactions(prevTransactions => prevTransactions.filter(tempId => tempId !== id)),
    [setTransactions],
  );

  return (
    <Drawer title="Add transactions" isOpen={isOpen} onClose={closeDrawer} Footer={Footer}>
      {transactions.map(tempId => (
        <TransactionInput key={tempId} removeTransaction={removeTransaction} tempId={tempId} />
      ))}
      <ButtonSecondary onClick={addTransaction} className={styles.addAnother}>
        Add another
      </ButtonSecondary>
    </Drawer>
  );
}

export default TransactionDrawer;
