import { Component } from 'react';
import AddProductTypeView from './AddProduct/AddProductTypeView';
import AddStockFootageView from './AddProduct/AddStockFootageView';
import AddBundleDetailView from './AddProduct/AddBundleDetailView';
import ProductUploadingDetailView from './AddProduct/ProductUploadingDetailView';
import ProductUploadVideoBasicInfoView from './AddProduct/ProductUploadVideoBasicInfoView';

class ContributorAddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  componentDidMount() {
    window.addEventListener('popstate', this.onBackButtonEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onBackButtonEvent);
    this.resetData();
  }

  onBackButtonEvent = e => {
    e.preventDefault();
    this.resetData();
  };

  resetData = () => {
    if (this.props.products.changing) {
      alert(
        'You have unsaved data or pending uploads, if you navigate away, you will lose information.'
      );
      this.props.cancelAllUpload();
    }
  };

  continueHandler = type => {
    this.props.setCurrentStep('stock', type);
  };

  uploadHandler = (productType, bundleName, bundlePrice, files) => {
    this.props.setCurrentStep('upload');
    this.props.setBundleBasic(productType, bundleName, bundlePrice, files);
    this.props.increaseFileIndex();
  };

  updateBundleBasic = (bundleName, bundlePrice) => {
    this.props.updateBundleBasic(bundleName, bundlePrice);
  };

  cancelUploadWithIndex = index => {
    this.props.cancelUploadWithIndex(index);
  };

  render() {
    const { products } = this.props;

    return (
      <div>
        {products.step === 'type' ? (
          <AddProductTypeView continueHandler={this.continueHandler} />
        ) : (
          ''
        )}

        {products.step === 'stock' ? (
          <AddStockFootageView uploadHandler={this.uploadHandler} />
        ) : (
          ''
        )}

        {products.step === 'upload' ? (
          <div className="pb-30">
            <AddBundleDetailView
              uploadHandler={this.uploadHandler}
              updateBundleBasic={this.updateBundleBasic}
              bundle={products.bundle}
            />
            <ProductUploadingDetailView />
            {products.bundle.productsToUpload.map((item, index) => (
              <ProductUploadVideoBasicInfoView
                productItem={item}
                index={index}
                key={index}
                setProductWithIndex={this.props.setProductWithIndex}
                cancelUploadWithIndex={this.props.cancelUploadWithIndex}
              />
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default ContributorAddProduct;
