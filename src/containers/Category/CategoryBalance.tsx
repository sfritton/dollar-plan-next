import React from 'react';
import ProgressBar from '../../components/ProgressBar';
import { getDollarString } from '../../util/currency';
import styles from './category.module.css';

interface Props {
  plannedAmount: number;
  actualAmount: number;
  isIncome?: boolean;
}

const getBalanceMessage = ({ plannedAmount, actualAmount, isIncome = false }: Props) => {
  const difference = plannedAmount - actualAmount;

  if (difference >= 0) {
    return `$${getDollarString(difference)} ${isIncome ? 'to go' : 'left'}`;
  }

  return `$${getDollarString(difference * -1)} ${isIncome ? 'extra' : 'over'}`;
};

const CategoryBalance = (props: Props) => {
  const { plannedAmount, actualAmount, isIncome } = props;
  const showBalance = plannedAmount !== 0 || actualAmount !== 0;

  const message = getBalanceMessage(props);

  return (
    <div className={styles.balance}>
      {showBalance && <div className={styles.balanceMessage}>{message}</div>}
      <ProgressBar numerator={actualAmount} denominator={plannedAmount} danger={!isIncome} />
    </div>
  );
};

export default CategoryBalance;
