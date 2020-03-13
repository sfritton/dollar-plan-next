import React, { useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Status } from '../../state/types';
import { useAction } from '../../state/hooks';
import fetchBudgetAction from '../../state/budgets/fetchBudget';
import { makeGetBudget } from '../../state/budgets/selectors';
import Header from '../../containers/Header';
import BudgetPageContent from '../../containers/BudgetPageContent';
import Layout from '../../components/Layout';
import uiSlice from '../../state/ui/slice';

const BudgetPage: NextPage = () => {
  const router = useRouter();
  const rawId = router.query.id;
  const budgetId = Array.isArray(rawId) ? '' : rawId;
  const getBudget = useMemo(() => makeGetBudget(budgetId), [budgetId]);

  const budget = useSelector(getBudget);
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
        <Header budgetId={budgetId} />
      </Layout.Header>
      <Layout.Content>
        <BudgetPageContent budget={budget} />
      </Layout.Content>
    </Layout.Grid>
  );
};

export default BudgetPage;
