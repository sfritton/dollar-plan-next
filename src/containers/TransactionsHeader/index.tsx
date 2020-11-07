import React from 'react';
import styles from '../Header/header.module.css';
import BudgetDrawer from '../HeaderLegacy/BudgetDrawer';

function TransactionsHeader() {
  return (
    <div className={styles.header}>
      <BudgetDrawer />
      <h1 className={styles.title}>Search Transactions</h1>
    </div>
  );
}

export default TransactionsHeader;
