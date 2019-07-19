import { Component } from 'react';
import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import Layout from '../components/layout';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

Auth.configure(awsconfig);

class Dashboard extends Component {
  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
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

export default Dashboard;
