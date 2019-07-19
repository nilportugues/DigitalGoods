import { Component } from 'react';

class ProductUploadingDetailView extends Component {
  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  render() {
    return (
      <div className="product-content mt-15">
        <div className="border-graycontainer-no">
          <div className="bundle-title">Uploading 1 of 5 videos</div>
          <div className="bundle-subtitle">
            Your videos are uploading.
            <span className="red">
              Please keep this page open until they&apos;re done, if closed this
              will
              <br />
              cancel all pending uploads
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductUploadingDetailView;
