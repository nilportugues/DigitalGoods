import { Component } from 'react';
import Router from 'next/router';
import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import requireAuth from '../components/requiresAuth';
import Layout from '../components/layout';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

Auth.configure(awsconfig);

class Dashboard extends Component {
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
            <h1>Dashboard</h1>
          </div>
        </div>
      </Layout>
    );
  }
}

export default requireAuth(Dashboard);
