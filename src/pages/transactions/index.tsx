import React from 'react';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import Header from '../../containers/Header';
import { useAction } from '../../state/hooks';
import searchTransactionsAction from '../../state/transactionSearchResults/searchTransactions';
import { useSelector } from 'react-redux';
import {
  getTransactionSearchResults,
  getTransactionSearchStatus,
} from '../../state/transactionSearchResults/selectors';
import Transaction from '../../containers/Transaction';
import InputSearch from '../../components/Input/InputSearch';
import styles from './transactions.module.css';
import { Status } from '../../state/types';

const TransactionsPage: NextPage = () => {
  const searchTransactions = useAction(searchTransactionsAction);
  const searchResults = useSelector(getTransactionSearchResults);
  const status = useSelector(getTransactionSearchStatus);

  return (
    <Layout.Grid>
      <Layout.Header>
        <Header title="Transactions" />
      </Layout.Header>
      <Layout.Content>
        <div className={styles.container}>
          <InputSearch
            className={styles.searchInput}
            onSubmit={searchTransactions}
            label="Search transactions"
          />
          {status === Status.SUCCESS &&
            (searchResults.length < 1 ? (
              <h2 className={styles.resultsHeader}>No transactions found</h2>
            ) : (
              <>
                <h2 className={styles.resultsHeader}>
                  Found {searchResults.length} matching transactions
                </h2>
                <ul className={styles.results}>
                  {searchResults.map(id => (
                    <Transaction id={id} key={id} />
                  ))}
                </ul>
              </>
            ))}
          {status === Status.FAILURE && (
            <h2 className={styles.resultsHeader}>Something went wrong. Try again</h2>
          )}
        </div>
      </Layout.Content>
    </Layout.Grid>
  );
};

export default TransactionsPage;
