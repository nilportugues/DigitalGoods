import React, { Component, Fragment } from 'react';
import {
  Dashboard,
  Layers,
  DescriptionOutlined,
  CreditCard,
  Assessment,
  Settings
} from '@material-ui/icons';

import Link from 'next/link';

import Router from 'next/router';
import Auth from '@aws-amplify/auth';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signin: false
    };
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(user => {
        this.setState({
          signin: true,
          user: user.attributes
        });
      })
      .catch(err => {
        this.setState({ signin: false });
      });
  }

  signin = e => {
    Router.push('/signin');
  };

  signout = () => {
    Auth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ signin: false });
    Router.push('/signin');
  };

  render() {
    if (typeof window === 'undefined') return <Fragment />;
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="/static/logo.png" alt="" width="112" height="28" />
          </a>
          <div
            className="navbar-burger burger"
            data-target="navbarExampleTransparentExample"
          >
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu">
          {this.state.signin === false ? (
            <div className="navbar-center">
              <Link href="/addproduct">
                <div
                  className={
                    Router.asPath === '/addproduct'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                >
                  Sell Your Product
                </div>
              </Link>
              <Link href="/company">
                <div
                  className={
                    Router.asPath === '/company'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                >
                  Company
                </div>
              </Link>

              <Link href="/pricing">
                <div
                  className={
                    Router.asPath === '/pricing'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                >
                  Pricing
                </div>
              </Link>

              <Link href="/support">
                <div
                  className={
                    Router.asPath === '/support'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                >
                  Support
                </div>
              </Link>
            </div>
          ) : (
            <div className="navbar-center">
              <Link href="/dashboard">
                <div
                  className={
                    Router.asPath === '/dashboard'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                >
                  <Dashboard />
                  &nbsp;&nbsp;Dashboard
                </div>
              </Link>
              <Link href="/products">
                <div
                  className={
                    Router.asPath === '/products'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                >
                  <Layers />
                  &nbsp;&nbsp;Products
                </div>
              </Link>

              <Link href="/releases">
                <div
                  className={
                    Router.asPath === '/releases'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                >
                  <DescriptionOutlined />
                  &nbsp;&nbsp;Releases
                </div>
              </Link>

              <Link href="/analytics">
                <div
                  className={
                    Router.asPath === '/analytics'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                >
                  <Assessment />
                  &nbsp;&nbsp;Analytics
                </div>
              </Link>
              <Link href="/payment">
                <div
                  className={
                    Router.asPath === '/payment'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                >
                  <CreditCard />
                  &nbsp;&nbsp;Payment
                </div>
              </Link>
              <Link href="/account">
                <div
                  className={
                    Router.asPath === '/account'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                >
                  <Settings />
                  &nbsp;&nbsp;Account
                </div>
              </Link>
            </div>
          )}
          <div className="navbar-end">
            <div className="navbar-item">
              {this.state.signin === false ? (
                <div className="field is-grouped">
                  <p className="control">
                    <Link href="/signin">
                      <button
                        type="button"
                        className="button is-mediumn-outline"
                      >
                        SIGN IN
                      </button>
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="field is-grouped">
                  <p className="control">
                    <Link href="/addproduct">
                      <button
                        type="button"
                        className="button is-mediumn-primary"
                      >
                        + Add Product
                      </button>
                    </Link>
                  </p>
                  <p className="control">
                    <Link href="/signin">
                      <button
                        type="button"
                        className="button"
                        onClick={e => this.signout(e)}
                      >
                        {this.state.user.given_name}
                      </button>
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
