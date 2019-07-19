import React from 'react'
import Link from "next/link";
import Header from "../components/header";
import { connect } from 'react-redux'
import { inputChange } from '../actions'
import Layout from '../components/layout'

class Index extends React.Component {
  static async getInitialProps (props) {
    const { store, isServer } = props.ctx

    return { isServer }
  }

  componentDidMount () {

  }

  render () {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <Link href="/about">
              <a>Go to About Me</a>
            </Link>
          </div>

        </section>
      </Layout>
    );
  }
}

export default connect()(Index)
