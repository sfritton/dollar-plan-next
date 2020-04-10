import React, { useState, useEffect, useCallback } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { Status } from '../../state/types';
import { selectBudgets, getStatus } from '../../state/budgets/selectors';
import fetchBudgetsAction from '../../state/budgets/fetchBudgets';
import { useAction } from '../../state/hooks';
import styles from './new-budget.module.css';
import { Select } from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import { ButtonPrimary } from '../../components/Button';
import { months, getMonthName } from '../../util/date';
import CreateBudget from '../../services/CreateBudget';
import { Budget } from '../../types/budget';

const currentYear = new Date().getFullYear();
const nextTenYears = [...new Array(10)].map((_, i) => currentYear + i);

const NewBudgetPage: NextPage = () => {
  const status = useSelector(getStatus);
  const budgets = useSelector(selectBudgets);

  const fetchBudgets = useAction(fetchBudgetsAction);

  useEffect(() => {
    if (status === Status.INIT) {
      fetchBudgets();
    }
  }, [status, fetchBudgets]);

  const [chosenMonth, setChosenMonth] = useState(1);
  const [chosenYear, setChosenYear] = useState(currentYear);
  const [isCopying, setIsCopying] = useState(false);
  const [prevBudgetId, setPrevBudgetId] = useState<Budget.Id>();

  const handleCreateBudget = useCallback(async () => {
    const { id } = await CreateBudget({
      month: chosenMonth,
      year: chosenYear,
      isCopying,
      prevBudgetId,
    });

    Router.push(`/budget/${id}?adjusting=true`);
  }, [chosenMonth, chosenYear, isCopying, prevBudgetId]);

  return (
    <div className={styles.page}>
      <Head>
        <title>New Budget | Dollar Plan</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.instructions}>Select a month and year for the new budget</div>
        <div className={styles.selectContainer}>
          <Select
            label="Month"
            className={styles.select}
            onChange={newMonth => setChosenMonth(Number(newMonth))}
          >
            {months.map((month, i) => (
              <option key={month} value={i + 1}>
                {month}
              </option>
            ))}
          </Select>
          <Select
            label="Year"
            className={styles.select}
            onChange={newYear => setChosenYear(Number(newYear))}
          >
            {nextTenYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </div>
        <Checkbox
          className={styles.checkbox}
          label="Copy an existing budget"
          checked={isCopying}
          onChange={setIsCopying}
        />
        {isCopying && (
          <Select
            value={String(prevBudgetId)}
            onChange={setPrevBudgetId}
            label="Make a copy of"
            className={styles.prevBudgetSelect}
          >
            {budgets.map(budget => (
              <option key={budget.id} value={budget.id}>
                {getMonthName(budget.month)} {budget.year}
              </option>
            ))}
          </Select>
        )}
        <ButtonPrimary onClick={handleCreateBudget} className={styles.button}>
          Create budget
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default NewBudgetPage;
