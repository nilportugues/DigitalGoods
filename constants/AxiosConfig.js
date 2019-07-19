import axios from 'axios';
import Auth from '@aws-amplify/auth';
import { toast } from 'react-toastify';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

class AxiosConfig {
  static init() {
    axios.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.common.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    axios.interceptors.request.use(null, error => {
      if (error.response) {
        if (error.response.status === 500) {
          toast.error('inteneral server error');
        }
      }

      return Promise.reject(error);
    });
  }
}

export default AxiosConfig;
