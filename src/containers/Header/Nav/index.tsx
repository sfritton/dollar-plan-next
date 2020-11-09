import React from 'react';
import styles from './nav.module.css';
import NavLink from './NavLink';

interface Props {
  onClickBudgetsLink: AnyFunction;
}

const Nav: React.FC<Props> = ({ onClickBudgetsLink }) => (
  <nav>
    <ul className={styles.list}>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink onClick={onClickBudgetsLink}>Budgets</NavLink>
      </li>
      <li>
        <NavLink href="/transactions">Transactions</NavLink>
      </li>
    </ul>
  </nav>
);
export default Nav;
