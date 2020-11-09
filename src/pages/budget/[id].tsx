import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Status } from '../../state/types';
import { useAction } from '../../state/hooks';
import fetchBudgetAction from '../../state/budgets/fetchBudget';
import Header from '../../containers/Header';
import BudgetPageContent from '../../containers/BudgetPageContent';
import Layout from '../../components/Layout';
import uiSlice from '../../state/ui/slice';
import { BudgetLoaded, BudgetUnloaded } from '../../state/budgets/slice';
import { getMonthName } from '../../util/date';
import useBudgetId from '../../hooks/useBudgetId';
import useBudget from '../../hooks/useBudget';
import styles from './budget.module.css';
import HeaderContent from '../../containers/BudgetPageContent/HeaderContent';

const getPageTitle = (budget?: BudgetLoaded | BudgetUnloaded) => {
  if (!budget || budget.status !== Status.SUCCESS) return '';

  return `${getMonthName(budget.month)} ${budget.year}`;
};

const BudgetPage: NextPage = () => {
  const router = useRouter();
  const budgetId = useBudgetId();
  const budget = useBudget();

  const fetchBudget = useAction(fetchBudgetAction);

  const adjusting = router.query.adjusting;
  const setIsAdjustingBudget = useAction(uiSlice.actions.setIsAdjustingBudget);

  useEffect(() => {
    if (adjusting) setIsAdjustingBudget(true);
  }, [adjusting]);

  useEffect(() => {
    if (typeof budgetId === 'undefined') return;

    if (!budget || budget.status === Status.INIT) {
      fetchBudget(budgetId);
    }
  }, [budget, fetchBudget, budgetId]);

  return (
    <Layout.Grid>
      <Layout.Header>
        <Header title={getPageTitle(budget)}>
          <HeaderContent />
        </Header>
      </Layout.Header>
      <Layout.Content className={styles.content}>
        <BudgetPageContent budget={budget} />
      </Layout.Content>
    </Layout.Grid>
  );
};

export default BudgetPage;
