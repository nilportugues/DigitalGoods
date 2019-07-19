import { Component } from 'react';
import Router from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';

import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import Layout from '../components/layout';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

Auth.configure(awsconfig);

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

class Signup extends Component {
  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  registerHandler = (email, password, firstName, lastName) => {
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email, // optional
        family_name: firstName,
        given_name: lastName
      },
      validationData: [] // optional
    })
      .then(data => {
        Router.push(`/confirmsignup/${data.user.username}`);
      })
      .catch(err => {
        if (err.code === 'UsernameExistsException') {
          toast.error('User already exist');
          Router.push(`/signin`);
        } else {
          toast.error('User Sign Up failed!');
        }
      });
  };

  render() {
    return (
      <Layout>
        <div className="columns">
          <div className="column card w-500">
            <h1>Sign Up</h1>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                // same shape as initial values
                console.log(values);
                this.registerHandler(
                  values.email,
                  values.password,
                  values.firstName,
                  values.lastName
                );
              }}
            >
              {({ errors, touched }) => (
                <Form className="mt-60">
                  <div className="field">
                    <label className="label">First Name</label>

                    <div className="control">
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="input is-medium"
                      />
                      {errors.firstName && touched.firstName ? (
                        <div>{errors.firstName}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Last Name</label>

                    <div className="control">
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="input is-medium"
                      />
                      {errors.lastName && touched.lastName ? (
                        <div>{errors.lastName}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Email</label>

                    <div className="control">
                      <Field
                        type="email"
                        name="email"
                        placeholder="user@company.com"
                        className="input is-medium"
                      />
                      {errors.email && touched.email ? (
                        <div>{errors.email}</div>
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
                        className="input is-medium"
                      />
                      {errors.password && touched.password ? (
                        <div>{errors.password}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button type="submit" className="button is-primary p-20">
                        Continue
                      </button>
                    </div>
                  </div>

                  <div className="field is-grouped">
                    <label className="label">Already have an account?</label>
                    <div className="control">
                      <Link href="/signin">
                        <button className="button is-text">Sign In</button>
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

export default Signup;
