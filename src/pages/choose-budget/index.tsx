import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { Status } from '../../state/types';
import { selectBudgets, getStatus } from '../../state/budgets/selectors';
import fetchBudgetsAction from '../../state/budgets/fetchBudgets';
import { getMonthName } from '../../util/date';
import { InputText } from '../../components/Input';
import styles from './choose-budget.module.css';
import { LinkOutline } from '../../components/Button/Link';
import { useAction } from '../../state/hooks';

const matchesSearchTerm = (name: string, searchTerm: string) => {
  if (searchTerm === '') return true;

  const searchRegex = new RegExp(searchTerm);

  return searchRegex.test(name.toLowerCase());
};

const ChooseBudgetPage: NextPage = () => {
  const status = useSelector(getStatus);
  const budgets = useSelector(selectBudgets);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBudgets = useAction(fetchBudgetsAction);

  useEffect(() => {
    if (status === Status.INIT) {
      fetchBudgets();
    }
  }, [status, fetchBudgets]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dollar Plan</title>
      </Head>
      <h1 className={styles.title}>Dollar Plan</h1>
      <h2 className={styles.heading}>Choose a budget</h2>
      <InputText
        className={styles.search}
        value={searchTerm}
        onChange={setSearchTerm}
        label="Filter"
      />
      <div className={styles.budgetsContainer}>
        {budgets.reduce((acc: JSX.Element[], { id, month, year }) => {
          const name = `${getMonthName(month)} ${year}`;
          const matches = matchesSearchTerm(name, searchTerm);

          if (!matches) return acc;

          return [
            ...acc,
            <LinkOutline key={id} className={styles.budgetButton} href={`/budget/${id}`}>
              {name}
            </LinkOutline>,
          ];
        }, [])}
      </div>
    </div>
  );
};

export default ChooseBudgetPage;
