import { Component } from 'react';
import Router from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import Auth from '@aws-amplify/auth';
import Loader from '../components/Loader';
import Layout from '../components/layout';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
    .matches(
      /(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number'
    ),
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

  registerHandler = (email, password, firstName, lastName) => {
    this.setState({ loading: true });
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
      .then(() => {
        // Encrypt
        const ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify({ email, password }),
          process.env.SECRET_KEY_CRYPTO
        );

        Router.push(
          `/confirmsignup/${encodeURIComponent(ciphertext.toString())}`
        );
      })
      .catch(err => {
        this.setState({ loading: false });
        if (err.code === 'UsernameExistsException') {
          toast.error('User already exist');
        } else {
          toast.error('User Sign Up failed!');
        }
      });
  };

  render() {
    return (
      <Layout>
        <Loader loading={this.state.loading} />
        <div className="columns">
          <div className="column signup-card">
            <h1>Sign Up</h1>
            <Formik
              initialValues={{
                email: '',
                password: '',
                firstName: '',
                lastName: ''
              }}
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
              {({ errors, touched, values }) => (
                <Form className="mt-60">
                  <div className="field">
                    <label className="label">First Name</label>

                    <div className="control">
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="input is-large"
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className="error">{errors.firstName}</div>
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
                        className="input is-large"
                      />
                      {errors.lastName && touched.lastName ? (
                        <div className="error">{errors.lastName}</div>
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
                        className="input is-large"
                      />
                      {errors.email && touched.email ? (
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
                      {errors.password && touched.password ? (
                        <div className="error">{errors.password}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button
                        type="submit"
                        className="button is-primary p-40"
                        disabled={
                          Object.keys(errors).length !== 0 ||
                          values.password.length === 0
                        }
                      >
                        Continue
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
