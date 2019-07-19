import React from 'react';
import Router from 'next/router';
import Auth from '@aws-amplify/auth';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

export function requiresAuth(Component) {
  return class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: false,
        user: null
      };
    }

    componentDidMount() {
      this.checkAndRedirect();
    }

    checkAndRedirect = () => {
      Auth.currentAuthenticatedUser({
        bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
        .then(user => {
          this.setState({
            isAuthenticated: true,
            user
          });
        })
        .catch(err => {
          this.setState({ isAuthenticated: false });
          console.log('currentAuthenticatedUser fail');
          Router.push(`/signin`);
        });
    };

    render() {
      return (
        <div>
          {' '}
          {this.state.isAuthenticated ? (
            <Component {...this.props} user={this.state.user} />
          ) : null}
        </div>
      );
    }
  };
}

export default requiresAuth;
