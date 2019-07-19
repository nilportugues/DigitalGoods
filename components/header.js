import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faFileAlt,
  faCreditCard,
  faCog,
  faTasks
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import Router from 'next/router';
import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signin: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({
        signin: true,
        user: JSON.parse(localStorage.getItem('user'))
      });
    } else {
      this.setState({ signin: false });
    }
  }

  signin = e => {
    Router.push('/signin');
  };

  signout = () => {
    Auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    Router.push('/signin');
  };

  render() {
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
              <Link href="/signup">
                <div className="navbar-item" href="/">
                  Sell Your Product
                </div>
              </Link>
              <Link href="/signup">
                <div className="navbar-item">Company</div>
              </Link>

              <Link href="/signup">
                <div className="navbar-item" href="/">
                  Pricing
                </div>
              </Link>

              <Link href="/signup">
                <div className="navbar-item" href="/">
                  Support
                </div>
              </Link>
            </div>
          ) : (
            <div className="navbar-center">
              <Link href="/signup">
                <div className="navbar-item" href="/">
                  <FontAwesomeIcon icon={faHome} />
                  &nbsp;&nbsp;Dashboard
                </div>
              </Link>
              <Link href="/signup">
                <div className="navbar-item">
                  <FontAwesomeIcon icon={faTasks} />
                  &nbsp;&nbsp;Products
                </div>
              </Link>

              <Link href="/signup">
                <div className="navbar-item" href="/">
                  <FontAwesomeIcon icon={faFileAlt} />
                  &nbsp;&nbsp;Releases
                </div>
              </Link>

              <Link href="/signup">
                <div className="navbar-item" href="/">
                  <FontAwesomeIcon icon={faHome} />
                  &nbsp;&nbsp;Analytics
                </div>
              </Link>
              <Link href="/signup">
                <div className="navbar-item" href="/">
                  <FontAwesomeIcon icon={faCreditCard} />
                  &nbsp;&nbsp;Payment
                </div>
              </Link>
              <Link href="/signup">
                <div className="navbar-item" href="/">
                  <FontAwesomeIcon icon={faCog} />
                  &nbsp;&nbsp;Account
                </div>
              </Link>
            </div>
          )}
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                {this.state.signin === false ? (
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
                ) : (
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">{this.state.user.given_name}</a>

                    <div className="navbar-dropdown">
                      <a className="navbar-item">My account</a>
                      <hr className="navbar-divider" />
                      <a className="navbar-item">
                        <div onClick={e => this.signout(e)}>SIGN OUT</div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
