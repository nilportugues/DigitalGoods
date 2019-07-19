import { Component } from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Auth from '@aws-amplify/auth';
import Layout from '../components/layout';
import Loader from '../components/Loader';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

const confirmSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
    .matches(
      /(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number'
    ),
  code: Yup.string()
    .min(6, 'Too Short!')
    .max(6, 'Too Long!')
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
      forgotEmailSent: false,
      loading: false
    };
  }

  resetHandler = (email, code, password) => {
    if (this.state.forgotEmailSent) {
      // Collect confirmation code and new password, then
      this.setState({ loading: true });
      Auth.forgotPasswordSubmit(email, code, password)
        .then(() => {
          this.setState({ loading: false });
          toast.success('Password changed successfully!');
          Router.push(`/signin`);
        })
        .catch(() => {
          this.setState({ loading: false });
          toast.error('Something went wrong!');
        });
    } else {
      this.setState({ loading: true });
      Auth.forgotPassword(email)
        .then(() => {
          this.setState({ forgotEmailSent: true, loading: false });
        })
        .catch(() => {
          this.setState({ loading: false });
          toast.error('Something went wrong!');
        });
    }
  };

  render() {
    return (
      <Layout>
        <Loader loading={this.state.loading} />
        <div className="columns">
          <div className="column reset-card">
            <h1>Reset your password</h1>
            <Formik
              initialValues={
                this.state.forgotEmailSent
                  ? { email: '', code: '', password: '' }
                  : { email: '' }
              }
              validationSchema={
                this.state.forgotEmailSent ? confirmSchema : emailSchema
              }
              onSubmit={values => {
                // same shape as initial values
                console.log(values);
                this.resetHandler(values.email, values.code, values.password);
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
                        id="email"
                        placeholder="user@company.com"
                        className="input is-large"
                      />
                      {errors.email && touched.email ? (
                        <div className="error">{errors.email}</div>
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
                          <div className="error">{errors.code}</div>
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
                          <div className="error">{errors.password}</div>
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
                        disabled={values.email.length === 0}
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
