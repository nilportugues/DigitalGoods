import { Component } from "react";
import Layout from '../components/layout'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Link from "next/link";
import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

Auth.configure(awsconfig);

const resetSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});


class ResetPassword extends Component {
  static getInitialProps() {
    const isServer = typeof window === "undefined";
    return { isServer };
  }

  resetHandler = (email) => {
    alert(email)
    Auth.forgotPassword(email)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }
  render() {
    return (
      <Layout>
        <div className="columns">
        <div className="column card w-500">
          <h1>Reset your password</h1>
          <Formik
            initialValues={{email: ''}}
            validationSchema={resetSchema}
            onSubmit={values => {
              // same shape as initial values
              console.log(values);
              this.resetHandler(values.email)
              
            }}
          >
            {({ errors, touched }) => (
              <Form className="mt-60">
                
                <div className="field">
                  <label className="label">Email</label>
                    
                  <div className="control">
                    
                    <Field type="email" name="email" placeholder="user@company.com" className="input is-medium"/>
                    {errors.email && touched.email  ? (
                      <div>{errors.email }</div>
                    ) : null}
                  </div>
                </div>
                
                <div className="field">
                  <div className="control">
                    <button type="submit" className="button is-primary p-20 my-10">Reset Password</button>
                  </div>
                </div>

                <div className="field is-grouped">
                  <label className="label">
                    Already have an account?
                  </label>
                  <div className="control">
                  <Link href="/signin">
                    <button className="button is-text">Sign In</button>
                  </Link>
                  </div>
                </div>

                <div className="field is-grouped">
                  <label className="label">
                    Don't have an account?
                  </label>
                  <div className="control">
                  <Link href="/signup">
                    <button className="button is-text">Sign Up</button>
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
