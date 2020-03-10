import React from 'react';
import { getCentString } from '../../util/currency';
import styles from './transaction.module.css';

interface Props {
  description: string;
  amount: number;
}

const TransactionDetails = ({ description, amount }: Props) => (
  <div className={styles.details}>
    <div>{description}</div>
    <div>${getCentString(amount)}</div>
  </div>
);

export default TransactionDetails;
