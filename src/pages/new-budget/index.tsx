import React, { useState, useCallback } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import styles from './new-budget.module.css';
import { Select } from '../../components/Input';
import { ButtonPrimary } from '../../components/Button';
import { months } from '../../util/date';
import CreateBudget from '../../services/CreateBudget';

const currentYear = new Date().getFullYear();
const nextTenYears = [...new Array(10)].map((_, i) => currentYear + i);

const NewBudgetPage: NextPage = () => {
  const [chosenMonth, setChosenMonth] = useState(1);
  const [chosenYear, setChosenYear] = useState(currentYear);

  const handleCreateBudget = useCallback(async () => {
    const { id } = await CreateBudget({ month: chosenMonth, year: chosenYear });

    Router.push(`/budget/${id}?adjusting=true`);
  }, [chosenMonth, chosenYear]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.instructions}>Select a month and year for the new budget</div>
        <div className={styles.selectContainer}>
          <Select
            label="Month"
            className={styles.select}
            onChange={e => setChosenMonth(e.target.value)}
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
            onChange={e => setChosenYear(e.target.value)}
          >
            {nextTenYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </div>
        <ButtonPrimary onClick={handleCreateBudget} className={styles.button}>
          Create budget
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default NewBudgetPage;
