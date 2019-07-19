import { Component } from 'react';

class AddBundleDetailView extends Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  updateBundleName = e => {
    const name = e.target.value;
    this.props.updateBundleBasic(name, this.props.bundle.bundlePrice);
  };

  updateBundleBasic = e => {
    const price = e.target.value;
    this.props.updateBundleBasic(this.props.bundle.bundleName, price);
  };

  render() {
    const { bundle } = this.props;

    return (
      <div className="product-content">
        <div className="title-header">
          <div className="bundle-title">Bundle Details</div>
        </div>

        <div className="border-container-no">
          <div className="columns">
            <div className="column">
              <div className="bundle-detail">
                <span className="label">Bundle Name</span>
                <div className="bundleinput no-margin">
                  <input
                    placeholder="Bundle Name"
                    className="input is-large"
                    value={bundle.bundleName}
                    onChange={e => this.updateBundleName(e)}
                  />
                </div>
                <div className="">
                  Enter a name for this bundle,
                  <br />
                  you can edit/update it later with other clips
                </div>
              </div>
            </div>
            <div className="column">
              <div className="bundle-detail">
                <span className="label">Bundle Price</span>
                <div className="bundleinput no-margin">
                  <input
                    placeholder="Bundle Price"
                    className="input is-large"
                    type="number"
                    min="0"
                    step="0.01"
                    value={bundle.bundlePrice}
                    onChange={e => this.updateBundlePrice(e)}
                  />
                </div>
                <div className="">
                  Enter the price you would like to set for a user to purchase
                  all of the clips in this package. We recommend making this
                  price competitive and discounted so users can purchase the
                  whole package.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddBundleDetailView;
