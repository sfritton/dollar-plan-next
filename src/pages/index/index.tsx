import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Status } from '../../state/types';
import { getStatus, selectBudgets } from '../../state/budgets/selectors';
import fetchBudgetsAction from '../../state/budgets/fetchBudgets';
import styles from './index.module.css';
import { ButtonPrimary } from '../../components/Button';
// import BudgetPicker from './BudgetPicker';
import { LinkOutline } from '../../components/Button/Link';
import { useAction } from '../../state/hooks';
import { NextPage } from 'next';

// TODO: fix this
const BudgetPicker: React.FC = () => null;

const Home: NextPage = () => {
  const [isChoosingBudget, setIsChoosingBudget] = useState(false);
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
      <h1 className={styles.title}>Dollar Plan</h1>
      {isChoosingBudget ? (
        <BudgetPicker />
      ) : (
        status === Status.SUCCESS && (
          <div className={styles.fadeIn}>
            {hasBudgets && (
              <>
                <ButtonPrimary className={styles.wideButton} onClick={() => setIsChoosingBudget(true)}>
                  Choose a budget
                </ButtonPrimary>
                <div>or</div>
              </>
            )}
            <LinkOutline className={styles.wideButton} href="/new-budget">
              Create a new {hasBudgets ? 'one' : 'budget'}
            </LinkOutline>
          </div>
        )
      )}
    </div>
  );
};

Home.getInitialProps = async ({ req }) => {
  const userAgent = req?.headers['user-agent'] ?? navigator.userAgent;
  return { userAgent };
};

export default Home;
