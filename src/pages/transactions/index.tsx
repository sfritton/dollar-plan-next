import React, { useState } from 'react';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import Header from '../../containers/Header';
import { ButtonPrimary } from '../../components/Button';
import { InputText } from '../../components/Input';
import { useAction } from '../../state/hooks';
import searchTransactionsAction from '../../state/transactionSearchResults/searchTransactions';
import { useSelector } from 'react-redux';
import { getTransactionSearchResults } from '../../state/transactionSearchResults/selectors';
import Transaction from '../../containers/Transaction';

const TransactionsPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchTransactions = useAction(searchTransactionsAction);
  const searchResults = useSelector(getTransactionSearchResults);

  return (
    <Layout.Grid>
      <Layout.Header>
        <Header title="Search Transactions" />
      </Layout.Header>
      <Layout.Content>
        <InputText value={searchTerm} onChange={setSearchTerm} label="Filter" />
        <ButtonPrimary onClick={() => searchTransactions(searchTerm)}>Search</ButtonPrimary>
        <ul>
          {searchResults.map(id => (
            <Transaction id={id} key={id} />
          ))}
        </ul>
      </Layout.Content>
    </Layout.Grid>
  );
};

export default TransactionsPage;
