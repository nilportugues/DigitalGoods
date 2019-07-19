/* eslint-disable no-lonely-if */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* global fetch */
import { all, call, select, put } from 'redux-saga/effects';
import { getStore } from '../store';
import {
  setUploadPercentCompleted,
  increaseFileIndex
} from '../actions/productAction';
import {
  doGetSignedUrl,
  doFileUpload,
  doStartMultiUpload,
  doCancelUploadProduct
} from '../apis/Product';

import {
  ALL_UPLOADS_COMPLETED,
  REMOVE_UPLOAD_WITHINDEX,
  RESET_PRODUCT
} from '../constants';

export const getProducts = state => state.products;

export const FILE_SIZE = 1024 * 1024 * 5;

export function* startUploadVideo() {
  localStorage.removeItem('f_cancel');
  const product = yield select(getProducts);

  const currentFileIndex = product.currentFileBeingUploadedIndex;

  if (currentFileIndex >= product.bundle.filesToUpload.length) {
    yield put({ type: ALL_UPLOADS_COMPLETED, payload: {} });
    return;
  }

  const nextFileToUpload = product.bundle.filesToUpload[currentFileIndex];

  if (nextFileToUpload && nextFileToUpload.size > FILE_SIZE) {
    doStartMultiUpload(nextFileToUpload, currentFileIndex);
  } else {
    const params = {
      objectName: nextFileToUpload.name,
      contentType: nextFileToUpload.type
    };

    try {
      const response = yield call(doGetSignedUrl, params);

      const config = {
        headers: { 'Content-Type': nextFileToUpload.type },
        onUploadProgress(progressEvent) {
          if (localStorage.getItem('f_cancel')) {
            return;
          }
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          getStore().dispatch(
            setUploadPercentCompleted(percentCompleted, currentFileIndex)
          );
        }
      };

      const res = yield call(
        doFileUpload,
        response.signedUrl,
        nextFileToUpload,
        config
      );
      yield put(increaseFileIndex());
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

export function* cancelAllUpload() {
  localStorage.setItem('f_cancel', 1);

  const product = yield select(getProducts);
  const { filesToUpload } = product.bundle;

  for (let index = filesToUpload.length - 1; index >= 0; index -= 1) {
    const file = product.bundle.filesToUpload[index];
    const { uploadId } = product.bundle.productsToUpload[index];
    const { percentUploadCompleted } = product.bundle.productsToUpload[index];
    const { currentFileBeingUploadedIndex } = product;
    console.log(`${currentFileBeingUploadedIndex}vs${index}`);

    let needDecreaseIndex = false;

    if (currentFileBeingUploadedIndex < index) {
      // delete file in the queue
      yield put({
        type: REMOVE_UPLOAD_WITHINDEX,
        payload: { index, needDecreaseIndex }
      });
    } else {
      // delete file - uploading or uploaded.
      if (percentUploadCompleted === 100) {
        // delete uploaded file
        yield put({
          type: REMOVE_UPLOAD_WITHINDEX,
          payload: { index, needDecreaseIndex }
        });
      } else {
        // delete uploading file
        needDecreaseIndex = false; // needn't upload next file because we cancel only

        if (file.size > FILE_SIZE) {
          const { success } = yield call(
            doCancelUploadProduct,
            file.name,
            uploadId
          );
          if (success) {
            yield put({
              type: REMOVE_UPLOAD_WITHINDEX,
              payload: { index, needDecreaseIndex }
            });
          }
        } else {
          yield put({
            type: REMOVE_UPLOAD_WITHINDEX,
            payload: { index, needDecreaseIndex }
          });
        }
      }
    }
  }

  yield put({
    type: RESET_PRODUCT,
    payload: {}
  });
}

export function* cancelUploadProduct({ payload: { index } }) {
  try {
    localStorage.setItem('f_cancel', 1);

    const product = yield select(getProducts);

    const file = product.bundle.filesToUpload[index];
    const { uploadId } = product.bundle.productsToUpload[index];
    const { percentUploadCompleted } = product.bundle.productsToUpload[index];
    const { currentFileBeingUploadedIndex } = product;
    console.log(`${currentFileBeingUploadedIndex}vs${index}`);

    let needDecreaseIndex = false;

    if (currentFileBeingUploadedIndex < index) {
      // delete file in the queue
      yield put({
        type: REMOVE_UPLOAD_WITHINDEX,
        payload: { index, needDecreaseIndex }
      });
    } else {
      // delete file - uploading or uploaded.
      if (percentUploadCompleted === 100) {
        yield put({
          type: REMOVE_UPLOAD_WITHINDEX,
          payload: { index, needDecreaseIndex }
        });
      } else {
        // delete uploading file
        needDecreaseIndex = true;

        if (file.size > FILE_SIZE) {
          const { success } = yield call(
            doCancelUploadProduct,
            file.name,
            uploadId
          );
          if (success) {
            yield all([
              yield put({
                type: REMOVE_UPLOAD_WITHINDEX,
                payload: { index, needDecreaseIndex }
              }),
              yield put(increaseFileIndex())
            ]);
          }
        } else {
          yield put({
            type: REMOVE_UPLOAD_WITHINDEX,
            payload: { index, needDecreaseIndex }
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}
