import React from 'react';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import Header from '../../containers/Header';
import { useAction } from '../../state/hooks';
import searchTransactionsAction from '../../state/transactionSearchResults/searchTransactions';
import { useSelector } from 'react-redux';
import { getTransactionSearchResults } from '../../state/transactionSearchResults/selectors';
import Transaction from '../../containers/Transaction';
import InputSearch from '../../components/Input/InputSearch';
import styles from './transactions.module.css';

const TransactionsPage: NextPage = () => {
  const searchTransactions = useAction(searchTransactionsAction);
  const searchResults = useSelector(getTransactionSearchResults);

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
          {searchResults.length > 0 && (
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
          )}
        </div>
      </Layout.Content>
    </Layout.Grid>
  );
};

export default TransactionsPage;
