/* eslint-disable import/prefer-default-export */
import {
  SET_ADD_PRODUCT_STEP,
  SET_BUNDLE_BASIC_INFO,
  UPDATE_BUNDLE_BASIC_INFO,
  UPLOAD_PERCENTCOMPLETED,
  INCREASE_FILE_INDEX,
  CANCEL_UPLOAD,
  CANCEL_ALL_UPLOAD,
  SET_PRODUCT_ITEM
} from '../constants';

export function setCurrentStep(step, type) {
  return {
    type: SET_ADD_PRODUCT_STEP,
    payload: { step, type }
  };
}

export function cancelAllUpload() {
  return {
    type: CANCEL_ALL_UPLOAD,
    payload: {}
  };
}

export function setBundleBasic(productType, bundleName, bundlePrice, files) {
  return {
    type: SET_BUNDLE_BASIC_INFO,
    payload: { productType, bundleName, bundlePrice, files }
  };
}

export function updateBundleBasic(bundleName, bundlePrice) {
  return {
    type: UPDATE_BUNDLE_BASIC_INFO,
    payload: { bundleName, bundlePrice }
  };
}

export function setProductWithIndex(index, productItem) {
  return {
    type: SET_PRODUCT_ITEM,
    payload: { index, productItem }
  };
}

export function setUploadPercentCompleted(
  percentCompleted,
  currentFileIndex,
  uploadId
) {
  return {
    type: UPLOAD_PERCENTCOMPLETED,
    payload: { percentCompleted, currentFileIndex, uploadId }
  };
}

export function increaseFileIndex() {
  return {
    type: INCREASE_FILE_INDEX
  };
}

export function cancelUploadWithIndex(index) {
  return {
    type: CANCEL_UPLOAD,
    payload: { index }
  };
}
