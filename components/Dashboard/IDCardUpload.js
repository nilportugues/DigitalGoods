import { Component } from 'react';
import Router from 'next/router';
import {
  AccountCircleOutlined,
  DescriptionOutlined,
  CreditCardOutlined
} from '@material-ui/icons';
import FileUploadProgress from '../FileUploadProgress';

class IDCardUpload extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {}

  render() {
    const { addProductHandler, successHandler } = this.props;

    return (
      <div className="upload-content">
        <div className="title-header">
          <div className="upload-title">
            {this.props.idUploadMode
              ? 'Almost done!'
              : 'Upload your first product'}
          </div>
          <div className="upload-subtitle">
            {this.props.idUploadMode ? (
              <div>
                Before you can start earming money on Company.io, we must verify
                your identity.
                <br />
                Please upload your Driver&apos;s license, Passport, or Country
                ID.
              </div>
            ) : (
              'Start earning money by uploading videos, images, and audio.'
            )}
          </div>
        </div>

        <div className="upload-product">
          {this.props.idUploadMode ? (
            <div className="upload-product-content py-20">
              <FileUploadProgress onSuccess={e => successHandler(e)} />
            </div>
          ) : (
            <div className="upload-product-content">
              <button
                type="button"
                onClick={e => addProductHandler(e)}
                className="button is-primary py-80"
              >
                + Add Product
              </button>
            </div>
          )}
        </div>

        <div className="columns pt-30">
          <div className="column">
            <div className="upload-content">
              <div className="title-header">
                <div className="upload-title-2">Upload profile image</div>
              </div>
              <div className="upload-product">
                <AccountCircleOutlined
                  style={{
                    fontSize: '75px',
                    margin: '40px auto',
                    color: '#bdbdbd'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="column">
            <div className="upload-content">
              <div className="title-header">
                <div className="upload-title-2">Add short bio</div>
              </div>
              <div className="upload-product">
                <DescriptionOutlined
                  style={{
                    fontSize: '75px',
                    margin: '40px auto',
                    color: '#bdbdbd'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="column">
            <div className="upload-content">
              <div className="title-header">
                <div className="upload-title-2">Setup Payment</div>
              </div>
              <div className="upload-product">
                <CreditCardOutlined
                  style={{
                    fontSize: '75px',
                    margin: '40px auto',
                    color: '#bdbdbd'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IDCardUpload;
