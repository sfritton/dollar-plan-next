import React from 'react';
import styles from './nav.module.css';
import NavLink from './NavLink';

const Nav: React.FC = () => {
  return (
    <nav>
      <ul className={styles.list}>
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          <NavLink>Budgets</NavLink>
        </li>
        <li>
          <NavLink href="/transactions">Transactions</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
