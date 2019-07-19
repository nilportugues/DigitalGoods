import { Component } from 'react';
import Router from 'next/router';
import Auth from '@aws-amplify/auth';
import IDCardUpload from './Dashboard/IDCardUpload';
import IdUploadSuccessAlert from './IdUploadSuccessAlert';
import FileUploadProgress from './FileUploadProgress';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

class ContributorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requireIDUpload: true,
      idUploadMode: false
    };
  }

  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  componentDidMount() {}

  successHandler = e => {
    console.log(`tttt${e}`);
    localStorage.setItem('idupload', e);
    this.setState({
      showIDSuccessDialog: true,
      filename: localStorage.getItem('idupload')
    });
  };

  addProductHandler = () => {
    if (this.state.requireIDUpload) {
      this.setState({ idUploadMode: true });
    }
  };

  closeHandler = () => {
    this.setState({
      showIDSuccessDialog: false,
      filename: '',
      idUploadMode: false
    });
  };

  uploadIDHandler = () => {
    if (this.state.requireIDUpload) {
      this.setState({ idUploadMode: true });
    }
  };

  reuploadHandler = () => {
    this.setState({
      showIDSuccessDialog: false,
      filename: '',
      showIDSuccessDialog: false
    });
  };

  render() {
    return (
      <div>
        <IdUploadSuccessAlert
          show={this.state.showIDSuccessDialog}
          filename={this.state.filename}
          onClose={this.closeHandler}
          onReupload={this.reuploadHandler}
        />
        <div className="content addproduct-content">
          <IDCardUpload
            idUploadMode={this.state.idUploadMode}
            addProductHandler={this.addProductHandler}
            successHandler={this.successHandler}
          />
        </div>
      </div>
    );
  }
}

export default ContributorDashboard;
