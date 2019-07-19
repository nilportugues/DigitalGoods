import { Component } from 'react';
import Router from 'next/router';
import Auth from '@aws-amplify/auth';
import requireAuth from '../components/requiresAuth';
import Layout from '../components/layout';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

class Account extends Component {
  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(user => {})
      .catch(err => {
        Router.push(`/signin`);
      });
  }

  render() {
    return (
      <Layout>
        <div className="columns">
          <div className="column card w-500">
            <h1>Account</h1>
          </div>
        </div>
      </Layout>
    );
  }
}

export default requireAuth(Account);
