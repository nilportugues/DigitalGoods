import React from "react";
import Router from 'next/router';
import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

Auth.configure(awsconfig);

export function requiresAuth(Component) {
  return class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isAuthenticated: false
      }
    }
    componentDidMount() {
      console.log('checkandredirect')
      this._checkAndRedirect();
    }

    _checkAndRedirect = () => {
      Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => {
        console.log(user)
        localStorage.setItem("token", user.signInUserSession.accessToken.jwtToken)
        localStorage.setItem("user", JSON.stringify(user.attributes))
        this.setState({isAuthenticated: true})
      })
      .catch(err => {
        Auth.currentAuthenticatedUser({
          bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
          console.log(user)
          localStorage.setItem("token", user.signInUserSession.accessToken.jwtToken)
          localStorage.setItem("user", JSON.stringify(user.attributes))
          this.setState({isAuthenticated: true})
        })
        .catch(err => {
          Router.push(`/signin`);
          this.setState({isAuthenticated: false})
        });  
      });
    }

    render() {
      return ( 
        <div> {
          this.state.isAuthenticated ? < Component {
            ...this.props
          }
          /> : null } 
          </div>
        );
      }
    }
  }

  export default requiresAuth;