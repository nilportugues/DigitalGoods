import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import Layout from '../components/layout';

class Index extends React.Component {
  static async getInitialProps(props) {
    const { isServer } = props.ctx;

    return { isServer };
  }

  componentDidMount() {}

  render() {
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

export default connect()(Index);
