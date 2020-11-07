import React, { useState } from 'react';
import BudgetDrawer from '../BudgetDrawer';
import styles from './nav.module.css';
import NavLink from './NavLink';

const Nav: React.FC = () => {
  const [isBudgetDrawerOpen, setIsBudgetDrawerOpen] = useState(false);

  return (
    <nav>
      <ul className={styles.list}>
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          <NavLink onClick={() => setIsBudgetDrawerOpen(true)}>Budgets</NavLink>
        </li>
        <li>
          <NavLink href="/transactions">Transactions</NavLink>
        </li>
      </ul>
      <BudgetDrawer isOpen={isBudgetDrawerOpen} onClose={() => setIsBudgetDrawerOpen(false)} />
    </nav>
  );
};

export default Nav;
