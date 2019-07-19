/* eslint-disable no-unused-vars */
import axios from 'axios';
import makeAuthenticatedCall from './Auth';

// eslint-disable-next-line import/prefer-default-export
export const doGetUser = username => {
  // eslint-disable-next-line func-names
  return new Promise(function(resolve, reject) {
    makeAuthenticatedCall()
      .then(data => {
        axios
          .get(`${process.env.BACKEND_URL}/users/${username}`, {})
          .then(response => {
            resolve(response.data.data);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const doCreateUser = params => {
  // eslint-disable-next-line func-names
  return new Promise(function(resolve, reject) {
    makeAuthenticatedCall()
      .then(data => {
        axios
          .post(`${process.env.BACKEND_URL}/users`, params)
          .then(response => {
            resolve(response.data.data);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const doUpdateMembership = (username, params) => {
  // eslint-disable-next-line func-names
  return new Promise(function(resolve, reject) {
    makeAuthenticatedCall()
      .then(data => {
        axios
          .put(
            `${process.env.BACKEND_URL}/users/update_membership/${username}`,
            params
          )
          .then(response => {
            resolve(response.data.data);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};
