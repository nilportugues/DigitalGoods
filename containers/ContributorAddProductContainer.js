/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import ContributorAddProduct from '../components/ContributorAddProduct';

import {
  setCurrentStep,
  cancelAllUpload,
  setBundleBasic,
  increaseFileIndex,
  updateBundleBasic,
  cancelUploadWithIndex,
  setProductWithIndex
} from '../actions/productAction';

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentStep: (step, type) => {
      dispatch(setCurrentStep(step, type));
    },
    increaseFileIndex: () => {
      dispatch(increaseFileIndex());
    },
    cancelAllUpload: () => {
      dispatch(cancelAllUpload());
    },
    setProductWithIndex: (index, productItem) => {
      dispatch(setProductWithIndex(index, productItem));
    },
    setBundleBasic: (productType, bundleName, bundlePrice, files) => {
      dispatch(setBundleBasic(productType, bundleName, bundlePrice, files));
    },
    cancelUploadWithIndex: index => {
      dispatch(cancelUploadWithIndex(index));
    },
    updateBundleBasic: (bundleName, bundlePrice) => {
      dispatch(updateBundleBasic(bundleName, bundlePrice));
    }
  };
};

const ContributorAddProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContributorAddProduct);

export default ContributorAddProductContainer;
