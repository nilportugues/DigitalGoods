import { Component } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Auth from '@aws-amplify/auth';
import Layout from '../components/layout';
import Loader from '../components/Loader';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  loginHandler = (email, password) => {
    this.setState({ loading: true });

    Auth.signIn({
      username: email, // Required, the username
      password // Optional, the password
    })
      .then(user => {
        toast.success('Sign In Success!');

        // save user data
        localStorage.setItem('user', JSON.stringify(user.attributes));

        this.setState({ loading: false });
        Router.push(`/dashboard`);
      })
      .catch(err => {
        this.setState({ loading: false });
        if (err.code === 'UserNotConfirmedException') {
          // The error happens if the user didn't finish the confirmation step when signing up
          // In this case you need to resend the code and confirm the user
          // About how to resend the code and confirm the user, please check the signUp part
          Router.push(`/confirmsignup/${email}/${password}`);
        } else if (err.code === 'PasswordResetRequiredException') {
          // The error happens when the password is reset in the Cognito console
          // In this case you need to call forgotPassword to reset the password
          // Please check the Forgot Password part.
          Router.push(`/resetpassword`);
        } else if (err.code === 'NotAuthorizedException') {
          // The error happens when the incorrect password is provided
          toast.error('Incorrect password!');
        } else if (err.code === 'UserNotFoundException') {
          // The error happens when the supplied username/email does not exist in the Cognito user pool
          toast.error('User not found!');
        } else {
          toast.error('Internal server error!');
        }
      });
  };

  render() {
    return (
      <Layout>
        <Loader loading={this.state.loading} />
        <div className="columns">
          <div className="column signin-card">
            <h1>Sign In</h1>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={SigninSchema}
              onSubmit={values => {
                // same shape as initial values
                console.log(values);
                this.loginHandler(values.email, values.password);
              }}
            >
              {({ errors, touched, values }) => (
                <Form className="mt-60">
                  <div className="field">
                    <label className="label">Email</label>

                    <div className="control">
                      <Field
                        type="email"
                        name="email"
                        placeholder="user@company.com"
                        className="input is-large"
                      />
                      {errors.email &&
                      touched.email &&
                      values.email.length > 0 ? (
                        <div className="error">{errors.email}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="input is-large"
                      />
                      {errors.password &&
                      touched.password &&
                      values.password.length > 0 ? (
                        <div className="error">{errors.password}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <Link href="/resetpassword">
                        <button
                          type="button"
                          className="button is-small-text"
                          style={{ padding: '0' }}
                        >
                          Forgot password?
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button
                        type="submit"
                        className="p-40 button is-primary "
                        disabled={
                          Object.keys(errors).length !== 0 ||
                          values.password.length === 0
                        }
                      >
                        Sign In
                      </button>
                    </div>
                  </div>

                  <div className="field is-grouped">
                    <label className="label">Don&apos;t have an account?</label>
                    <div className="control">
                      <Link href="/signup">
                        <button type="button" className="button is-text">
                          Sign Up
                        </button>
                      </Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Layout>
    );
  }
}

export default SignIn;
