/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import Router from 'next/router';
import Auth from '@aws-amplify/auth';
import requireAuth from '../components/requiresAuth';
import Layout from '../components/layout';
import IdUploadSuccessAlert from '../components/IdUploadSuccessAlert';

import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIDSuccessDialog: false,
      filename: ''
    };
  }

  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  componentDidMount() {
    if (localStorage.getItem('idupload')) {
      this.setState({
        showIDSuccessDialog: true,
        filename: localStorage.getItem('idupload')
      });
    }
  }

  addProductHandler = e => {
    Router.push('/addproduct');
  };

  closeHandler = () => {
    this.setState({ showIDSuccessDialog: false });
    localStorage.removeItem('idupload');
  };

  reuploadHandler = () => {
    this.setState({ showIDSuccessDialog: false });
    Router.push('/addproduct');
    localStorage.removeItem('idupload');
  };

  render() {
    const data = {
      '2017-06-13': 2,
      '2017-06-14': 5,
      '2017-06-15': 5,
      '2017-06-16': 10,
      '2017-06-17': 15,
      '2017-06-18': 5,
      '2017-06-19': 9,
      '2017-06-20': 4
    };

    return (
      <Layout title="dashboard" description="Upload your first product">
        <IdUploadSuccessAlert
          show={this.state.showIDSuccessDialog}
          filename={this.state.filename}
          onClose={this.closeHandler}
          onReupload={this.reuploadHandler}
        />
        <div className="columns">
          <div className="column dashboard-content">
            <div className="">
              <div className="columns">
                <div className="column">
                  <button
                    type="button"
                    className="button is-primary btn-product"
                    onClick={e => this.addProductHandler(e)}
                  >
                    + Add Product
                  </button>
                </div>

                {/* sales */}
                <div className="column">
                  <div className="section-label">Sales</div>
                  <div className="dashboard-card">
                    <div className="columns">
                      <div className="column">
                        <div className="">Today</div>
                        <div className="price-label">$124.23</div>
                      </div>

                      <div className="column">
                        <div className="">Today</div>
                        <div className="price-label">$124.23</div>
                      </div>
                    </div>

                    <div className="columns">
                      <div className="column">
                        <div className="">Today</div>
                        <div className="price-label">$124.23</div>
                      </div>

                      <div className="column">
                        <div className="">Today</div>
                        <div className="price-label">$124.23</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                {/* products */}
                <div className="column">
                  <div className="section-label">Products</div>
                  <div className="dashboard-card1">
                    <div className="columns">
                      <div className="column">
                        <div className="pr-40">
                          <div className="dashboard-label">Today</div>
                          <div className="price-label">5</div>
                        </div>
                      </div>

                      <div className="column">
                        <div className="pr-40 tl">
                          <div className="dashboard-label">This Week</div>
                          <div className="price-label">14</div>
                        </div>
                      </div>
                    </div>

                    <div className="columns pt-20">
                      <div className="column">
                        <div className="dashboard-label">This Month</div>
                        <div className="price-label">23</div>
                      </div>

                      <div className="column">
                        <div className="pr-40 tl">
                          <div className="dashboard-label">This Year</div>
                          <div className="price-label">128</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* best sellers */}

                <div className="column">
                  <div className="section-label">Best Sellers</div>
                  <div className="dashboard-card1">
                    <div className="columns">
                      <div className="column">
                        <div className="product-label">$124.23</div>
                      </div>

                      <div className="column">
                        <div className="count-label">30</div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <div className="product-label">$124.23</div>
                      </div>

                      <div className="column">
                        <div className="count-label">30</div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <div className="product-label">$124.23</div>
                      </div>

                      <div className="column">
                        <div className="count-label">30</div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <div className="product-label">$124.23</div>
                      </div>

                      <div className="column">
                        <div className="count-label">30</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* chart */}
              <div className="columns mt-40">
                {/* This Week */}
                <div className="column">
                  <div className="section-label">This Week</div>
                  <div className="dashboard-chart">
                    <LineChart
                      colors={['#1ba076', '#1ba076']}
                      ytitle="Items Sold"
                      data={data}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default requireAuth(Dashboard);
