import { EventEmitter } from 'events';
import React from 'react';
import objectAssign from 'object-assign';
import { Cancel } from '@material-ui/icons';

import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);
Storage.configure(awsconfig);

const styles = {
  progressWrapper: {
    height: '28px',
    marginTop: '10px',
    width: '100%',
    maxWidth: '188px',
    float: 'left',
    overflow: 'hidden',
    backgroundColor: '#E0E0E0'
  },
  progressBar: {
    float: 'left',
    width: '0',
    height: '100%',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#35AB86',
    WebkitTransition: 'width .6s ease',
    Otransition: 'width .6s ease',
    transition: 'width .6s ease'
  },
  cancelButton: {
    marginTop: '10px',
    marginLeft: '20px',
    marginRight: '-50px',
    WebkitAppearance: 'none',
    padding: 0,
    cursor: 'pointer',
    background: '0 0',
    border: 0,
    float: 'left',
    fontSize: '21px',
    fontWeight: 700,
    lineHeight: 1,
    color: '#000',
    textShadow: '0 1px 0 #fff',
    filter: 'alpha(opacity=20)'
  }
};

class FileUploadProgress extends React.Component {
  constructor(props) {
    super(props);
    this.proxy = new EventEmitter();
    this.state = {
      progress: -1,
      hasError: false,
      message: 'jpg, png, 2MB max size',
      files: null
    };
  }

  cancelUpload = () => {
    this.proxy.emit('abort');
    this.setState({
      progress: -1,
      hasError: false,
      files: null
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState(
      {
        progress: 0,
        hasError: false
      },
      this.doUpload
    );
  };

  onFileChange = evt => {
    const { files } = evt.target;
    console.log('---------file --------');
    console.log(files.length);
    const array = this.fileListToArray(files);
    this.setState({ files: array, progress: -1, hasError: false });
  };

  fileListToArray = list => {
    const array = [];
    for (let i = 0; i < list.length; i += 1) {
      array.push(list.item(i));
    }
    return array;
  };

  doUpload = () => {
    const file = this.state.files[0];

    Auth.currentSession()
      .then(data => {
        Storage.put(file.name, file, {
          level: 'private',
          contentType: 'image/*',
          progressCallback(e) {
            const progress = parseInt((e.loaded / e.total) * 100, 10);
            console.log(progress);
            this.setState({
              progress
            });
          }
        })
          .then(result => {
            console.log(result);
            this.setState({
              hasError: false,
              progress: 100
            });

            setTimeout(() => {
              this.props.onSuccess(file.name);
            }, 1000);
          })
          .catch(err => {
            this.setState({
              hasError: true
            });
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const formElement = this.props.formRenderer(
      this.state.message,
      this.state.progress,
      this.state.files,
      this.onSubmit,
      this.onFileChange
    );
    const progessElement = this.props.progressRenderer(
      this.state.progress,
      this.state.hasError,
      this.cancelUpload
    );

    return (
      <div>
        {formElement}
        {progessElement}
      </div>
    );
  }
}

FileUploadProgress.defaultProps = {
  formRenderer: (message, progress, files, onSubmit, onFileChange) => (
    <form
      className="_react_fileupload_form_content"
      method="post"
      onSubmit={onSubmit}
    >
      <div className="image-upload">
        <label htmlFor="file-input">
          <img src="/static/driver_id.png" alt="" />
        </label>

        <input
          id="file-input"
          type="file"
          accept="image/*"
          name="file"
          onChange={onFileChange}
        />
      </div>

      {progress > -1 ? (
        <div className="upload-product-text">
          Uploading...
          <span
            style={{ color: '#39f', fontSize: '15px', fontStyle: 'italic' }}
          >
            {files[0].name}
          </span>
        </div>
      ) : files ? (
        <div
          className="upload-product-text"
          style={{ color: '#39f', fontSize: '15px', fontStyle: 'italic' }}
        >
          {files[0].name}
        </div>
      ) : (
        <div className="upload-product-text">{message}</div>
      )}

      {progress > -1 ? (
        ''
      ) : (
        <button
          type="submit"
          className="button is-mediumn-primary"
          disabled={files === null}
        >
          UPLOAD
        </button>
      )}
    </form>
  ),

  progressRenderer: (progress, hasError, cancelHandler) => {
    if (hasError || progress > -1) {
      const barStyle = objectAssign({}, styles.progressBar);
      barStyle.width = `${progress}%`;

      let message = <span>${progress}%</span>;
      if (hasError) {
        barStyle.backgroundColor = '#d9534f';
        message = <span style={{ color: '#fff' }}>Failed to upload ...</span>;
      } else if (progress === 100) {
        message = <span>100%</span>;
      }

      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={styles.progressWrapper}>
            <div className="_react_fileupload_progress_bar" style={barStyle}>
              <div
                style={{
                  textAlign: 'left',
                  marginLeft: '20px',
                  marginTop: '3px'
                }}
              >
                {message}
              </div>
            </div>
          </div>
          <button
            type="button"
            style={styles.cancelButton}
            onClick={cancelHandler}
          >
            <Cancel style={{ color: 'red' }} />
          </button>
        </div>
      );
    }
    return '';
  }
};

export default FileUploadProgress;
