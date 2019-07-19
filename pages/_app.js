import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import '../styles/styles.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer } from 'react-toastify';
import createStore from '../store';
import 'react-toastify/dist/ReactToastify.css';

library.add(faStroopwafel);

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />

          <ToastContainer />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
