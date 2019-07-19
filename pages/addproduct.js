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

class AddProduct extends Component {
  static getInitialProps() {
    const isServer = typeof window === "undefined";
    return { isServer };
  }

  continueHandler = () => {
    alert('email')
    
  }

  cancelHandler = () => {
    alert('sss')
    
  }

  render() {
    return (
      <Layout>
        <div className="columns">
        <div className="column mt-60 w-500">
          <h1>Add Product</h1>
          
            <div className="mt-60">
                
                <div className="field">
                  <label className="label">What type of product do you want to upload?</label>
                    
                  <div className="control">
                    
                  </div>
                </div>

                <div className="columns">
                    <div className="column is-one-third">

                    </div>
                </div>
                

                <div className="field is-grouped">
                    <div className="control">
                        <button type="submit" className="button is-outline p-20">Cancel</button>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-primary p-20">Continue -></button>
                    </div>
                </div>
              </div>
        </div>
        </div>
      </Layout>
    );
  }
}

export default AddProduct;
