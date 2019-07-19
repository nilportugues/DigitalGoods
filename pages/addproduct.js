import { Component } from 'react';
import Router from 'next/router';
import {
  AccountCircleOutlined,
  DescriptionOutlined,
  CreditCardOutlined
} from '@material-ui/icons';

import Auth from '@aws-amplify/auth';
import FileUploadProgress from '../components/FileUploadProgress';
import Layout from '../components/layout';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requireIDUpload: true,
      idUploadMode: false
    };
  }

  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  addProductHandler = () => {
    if (this.state.requireIDUpload) {
      this.setState({ idUploadMode: true });
    }
  };

  uploadIDHandler = () => {
    if (this.state.requireIDUpload) {
      this.setState({ idUploadMode: true });
    }
  };

  successHandler = (e) => {
    console.log('tttt' + e);
    localStorage.setItem('idupload', e);
    Router.push('/dashboard');
  };

  render() {
    return (
      <Layout title="add product" description="Upload your first product">
        <div className="content addproduct-content">
          <div className="upload-content">
            <div className="title-header">
              <div className="upload-title">
                {this.state.idUploadMode
                  ? 'Almost done!'
                  : 'Upload your first product'}
              </div>
              <div className="upload-subtitle">
                {this.state.idUploadMode ? (
                  <div>
                    Before you can start earming money on Company.io, we must
                    verify your identity.
                    <br />
                    Please upload your Driver&apos;s license, Passport, or
                    Country ID.
                  </div>
                ) : (
                  'Start earning money by uploading videos, images, and audio.'
                )}
              </div>
            </div>

            <div className="upload-product">
              {this.state.idUploadMode ? (
                <div className="upload-product-content py-20">
                  <FileUploadProgress onSuccess={e => this.successHandler(e)} />
                </div>
              ) : (
                <div className="upload-product-content">
                  <button
                    type="button"
                    onClick={e => this.addProductHandler(e)}
                    className="button is-primary py-80"
                  >
                    + Add Product
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* digital goods type */}
          <div className="columns pt-30">
            <div className="column">
              <div className="upload-content">
                <div className="title-header">
                  <div className="upload-title-2">Upload profile image</div>
                </div>
                <div className="upload-product">
                  <AccountCircleOutlined
                    style={{
                      fontSize: '75px',
                      margin: '40px auto',
                      color: '#bdbdbd'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="column">
              <div className="upload-content">
                <div className="title-header">
                  <div className="upload-title-2">Add short bio</div>
                </div>
                <div className="upload-product">
                  <DescriptionOutlined
                    style={{
                      fontSize: '75px',
                      margin: '40px auto',
                      color: '#bdbdbd'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="column">
              <div className="upload-content">
                <div className="title-header">
                  <div className="upload-title-2">Setup Payment</div>
                </div>
                <div className="upload-product">
                  <CreditCardOutlined
                    style={{
                      fontSize: '75px',
                      margin: '40px auto',
                      color: '#bdbdbd'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default AddProduct;
