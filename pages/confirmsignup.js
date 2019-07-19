import { Component } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import CryptoJS from 'crypto-js';
import * as Yup from 'yup';
import Link from 'next/link';
import Auth from '@aws-amplify/auth';
import Layout from '../components/layout';
import Loader from '../components/Loader';
import awsconfig from '../aws-exports';
import { doCreateUser } from '../apis/User';

Auth.configure(awsconfig);

const ConfirmSchema = Yup.object().shape({
  code: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

class ConfirmSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  static getInitialProps(ctx) {
    const data = decodeURIComponent(ctx.ctx.query.data);

    return {
      data
    };
  }

  confirmHandler = code => {
    this.setState({ loading: true });

    // Decrypt
    const bytes = CryptoJS.AES.decrypt(
      this.props.data,
      process.env.SECRET_KEY_CRYPTO
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const username = decryptedData.email;
    const { password } = decryptedData;

    Auth.confirmSignUp(username, code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
      .then(() => {
        Auth.signIn({
          username,
          password
        })
          .then(() => {
            Auth.currentUserInfo()
              .then(user => {
                localStorage.setItem('user', JSON.stringify(user.attributes));
                toast.success('Confirm Code success!');

                doCreateUser({
                  cognito_id: user.id,
                  email: user.attributes.email,
                  first_name: user.attributes.family_name,
                  last_name: user.attributes.given_name
                })
                  .then(() => {
                    this.setState({ loading: false });
                    Router.push(`/dashboard`);
                  })
                  .catch(() => {
                    this.setState({ loading: false });
                    Auth.signOut();
                    Router.push(`/signin`);
                  });
              })
              .catch(() => {
                this.setState({ loading: false });
                Auth.signOut();
                Router.push(`/signin`);
              });
          })
          .catch(() => {
            this.setState({ loading: false });
            Router.push(`/signin`);
          });
      })
      .catch(() => {
        toast.error('Confirm code failed!');
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <Layout>
        <Loader loading={this.state.loading} />
        <div className="columns">
          <div className="column signin-card">
            <h1>Confirm Code</h1>
            <Formik
              initialValues={{ code: '' }}
              validationSchema={ConfirmSchema}
              onSubmit={values => {
                // same shape as initial values
                this.confirmHandler(values.code);
              }}
            >
              {({ errors, touched }) => (
                <Form className="mt-60">
                  <div className="field">
                    <label className="label">Code</label>

                    <div className="control">
                      <Field
                        type="text"
                        name="code"
                        placeholder="Code"
                        className="input is-medium"
                      />
                      {errors.code && touched.code ? (
                        <div>{errors.code}</div>
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

export default ConfirmSignUp;
