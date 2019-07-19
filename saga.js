/* eslint-disable import/no-cycle */
/* global fetch */

import {
  all,
  call,
  delay,
  put,
  take,
  takeLatest,
  takeEvery
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';

import {
  INCREASE_FILE_INDEX,
  CANCEL_ALL_UPLOAD,
  CANCEL_UPLOAD
} from './constants';
import {
  startUploadVideo,
  cancelUploadProduct,
  cancelAllUpload
} from './sagas/products';

es6promise.polyfill();

function* rootSaga() {
  yield all([
    takeEvery(INCREASE_FILE_INDEX, startUploadVideo),
    takeEvery(CANCEL_ALL_UPLOAD, cancelAllUpload),
    takeEvery(CANCEL_UPLOAD, cancelUploadProduct)
  ]);
}

export default rootSaga;
