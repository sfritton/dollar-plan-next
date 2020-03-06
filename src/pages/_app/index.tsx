import React from 'react';
import { Provider } from 'react-redux';

import App from 'next/app';

import store from '../../state/store';
import './globalStyles.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default MyApp;
