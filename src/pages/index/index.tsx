import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { Status } from '../../state/types';
import { getStatus, selectBudgets } from '../../state/budgets/selectors';
import fetchBudgetsAction from '../../state/budgets/fetchBudgets';
import styles from './index.module.css';
import { LinkOutline, LinkPrimary } from '../../components/Button/Link';
import { useAction } from '../../state/hooks';

const HomePage: NextPage = () => {
  const status = useSelector(getStatus);
  const budgets = useSelector(selectBudgets);

  const fetchBudgets = useAction(fetchBudgetsAction);

  useEffect(() => {
    if (status === Status.INIT) {
      fetchBudgets();
    }
  }, [status, fetchBudgets]);

  const hasBudgets = budgets.length > 0;

  return (
    <div className={styles.container}>
      <Head>
        <title>Dollar Plan</title>
      </Head>
      <h1 className={styles.title}>Dollar Plan</h1>
      {status === Status.SUCCESS && (
        <div className={styles.fadeIn}>
          {hasBudgets && (
            <>
              <LinkPrimary className={styles.wideButton} href="/choose-budget">
                Choose a budget
              </LinkPrimary>
              <div>or</div>
            </>
          )}
          <LinkOutline className={styles.wideButton} href="/new-budget">
            Create a new {hasBudgets ? 'one' : 'budget'}
          </LinkOutline>
        </div>
      )}
    </div>
  );
};

export default HomePage;
