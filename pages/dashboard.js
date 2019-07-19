/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import Router from 'next/router';
import Auth from '@aws-amplify/auth';
import requireAuth from '../components/requiresAuth';
import Layout from '../components/layout';
import ContributorDashboard from '../components/ContributorDashboard';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  componentDidMount() {}

  // addProductHandler = e => {
  //   Router.push('/addproduct');
  // };

  // closeHandler = () => {
  //   this.setState({ showIDSuccessDialog: false });
  //   localStorage.removeItem('idupload');
  // };

  // reuploadHandler = () => {
  //   this.setState({ showIDSuccessDialog: false });
  //   Router.push('/addproduct');
  //   localStorage.removeItem('idupload');
  // };

  render() {
    return (
      <Layout title="dashboard" description="Upload your first product">
        <ContributorDashboard></ContributorDashboard>
      </Layout>
    );
  }
}

export default requireAuth(Dashboard);
