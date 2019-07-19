import { Component } from "react";
import Router from "next/router"
import Layout from '../components/layout'
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Link from "next/link";
import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

Auth.configure(awsconfig);

const ConfirmSchema = Yup.object().shape({
    code: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  
});


class ConfirmSignUp extends Component {
  static getInitialProps(ctx) {
    console.log('test')
    console.log(ctx.ctx.query.username)
    console.log('test')
    return { username: ctx.ctx.query.username };
  }

  confirmHandler = (code) => {
    Auth.confirmSignUp(this.props.username, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true    
    }).then(data => {
        toast.success("Confirm Code success!")
        Router.push(`/signin`)
    })
    .catch(err => {
        toast.error("Confirm code failed!")
        console.log(err)
    });
  
  }
  render() {
    return (
      <Layout>
        <div className="columns">
        <div className="column card w-500">
          <h1>Confirm Code</h1>
          <Formik
            initialValues={{code: ''}}
            validationSchema={ConfirmSchema}
            onSubmit={values => {
              // same shape as initial values
              console.log(values);
              this.confirmHandler(values.code)
              
            }}
          >
            {({ errors, touched }) => (
              <Form className="mt-60">
                
                <div className="field">
                  <label className="label">Code</label>
                    
                  <div className="control">
                    
                    <Field type="text" name="code" placeholder="Code" className="input is-medium"/>
                    {errors.code && touched.code  ? (
                      <div>{errors.code }</div>
                    ) : null}
                  </div>
                </div>
                
                <div className="field">
                  <div className="control">
                    <button type="submit" className="button is-primary p-20">Continue</button>
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
