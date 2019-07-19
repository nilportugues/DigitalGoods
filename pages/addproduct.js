import { Component } from 'react';
import Auth from '@aws-amplify/auth';
import Layout from '../components/layout';
import ContributorAddProductContainer from '../containers/ContributorAddProductContainer';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

class AddProduct extends Component {
  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  render() {
    return (
      <Layout title="add product" description="Upload your first product">
        <ContributorAddProductContainer />
      </Layout>
    );
  }
}

export default AddProduct;
