import React from 'react';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import Header from '../../containers/Header';

const TransactionsPage: NextPage = () => {
  return (
    <Layout.Grid>
      <Layout.Header>
        <Header title="Search Transactions" />
      </Layout.Header>
      <Layout.Content>Look at all these transactions</Layout.Content>
    </Layout.Grid>
  );
};

export default TransactionsPage;
