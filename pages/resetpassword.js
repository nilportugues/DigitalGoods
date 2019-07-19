import { Component } from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import Layout from '../components/layout';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

Auth.configure(awsconfig);

const resetSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

class ResetPassword extends Component {
  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  constructor(props) {
    super(props);
    this.state = {
      forgotEmailSent: false
    };
  }

  resetHandler = (email, code, password) => {
    if (this.state.forgotEmailSent) {
      // Collect confirmation code and new password, then
      Auth.forgotPasswordSubmit(email, code, password)
        .then(() => {
          toast.success('Password changed successfully!');
          Router.push(`/signin`);
        })
        .catch(() => {
          toast.error('Something went wrong!');
        });
    } else {
      Auth.forgotPassword(email)
        .then(() => {
          this.setState({ forgotEmailSent: true });
        })
        .catch(() => {
          toast.error('Something went wrong!');
        });
    }
  };

  render() {
    return (
      <Layout>
        <div className="columns">
          <div className="column reset-card">
            <h1>Reset your password</h1>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={resetSchema}
              onSubmit={values => {
                // same shape as initial values
                console.log(values);
                this.resetHandler(values.email, values.code, values.password);
              }}
            >
              {({ errors, touched }) => (
                <Form className="mt-60">
                  <div className="field">
                    <label className="label">Email</label>

                    <div className="control">
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="user@company.com"
                        className="input is-large"
                      />
                      {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                      ) : null}
                    </div>
                  </div>

                  {this.state.forgotEmailSent ? (
                    <div className="field">
                      <label className="label">Code</label>

                      <div className="control">
                        <Field
                          type="code"
                          name="code"
                          id="code"
                          placeholder="123456"
                          className="input is-large"
                        />
                        {errors.code && touched.code ? (
                          <div>{errors.code}</div>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {this.state.forgotEmailSent ? (
                    <div className="field">
                      <label htmlFor="password" className="label">
                        New Password
                      </label>

                      <div className="control">
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter your new Password"
                          className="input is-large"
                        />
                        {errors.password && touched.password ? (
                          <div>{errors.password}</div>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  <div className="field">
                    <div className="control">
                      <button
                        type="submit"
                        className="button is-primary p-20 my-10"
                      >
                        {this.state.forgotEmailSent
                          ? 'Confirm'
                          : 'Reset Password'}
                      </button>
                    </div>
                  </div>

                  <div className="field is-grouped">
                    <label className="label">Already have an account?</label>
                    <div className="control">
                      <Link href="/signin">
                        <button type="button" className="button is-text">
                          Sign In
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div
                    className="field is-grouped"
                    style={{ marginTop: '-20px' }}
                  >
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

export default ResetPassword;
