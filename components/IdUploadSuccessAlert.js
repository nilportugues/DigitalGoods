import React from 'react';
import { CheckCircle, Cancel } from '@material-ui/icons';

const IdUploadSuccessAlert = ({ show, filename, onClose, onReupload }) => {
  return (
    <div>
      <div
        className="alert-body"
        style={{ display: !show ? 'none' : 'flex' }}
      />
      <div
        className="alert-content"
        style={{ display: !show ? 'none' : 'flex' }}
      >
        <div className="checkmark">
          <CheckCircle fontSize="large" />
        </div>
        <div className="alert-subcontent">
          <div className="title-content">
            <div className="alert-title">
              Identification Upload was Successful
            </div>
            <div className="alert-cancel" onClick={onClose}>
              <Cancel />
            </div>
          </div>

          <div className="alert-desc">
            Thank you for submitting your identification, we will review it and
            <br /> send you a email to verify of your status within 24 hours.
          </div>
          <div className="alert-footer">
            <div className="alert-left">
              Uploaded &nbsp;
              <span className="alert-filename">{filename}</span>
            </div>
            <div className="alert-right">
              Wrong file ?{' '}
              <span className="alert-reupload" onClick={onReupload}>
                Reupload
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdUploadSuccessAlert;
