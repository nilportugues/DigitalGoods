/* eslint-disable react/button-has-type */
import { Component } from 'react';
import { Add } from '@material-ui/icons';
import Dropzone from 'react-dropzone';

class ThumbnailTabView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedType: 0 };
  }

  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }
  setThumbnail = (files) => {
  };

  render() {
    return (
      <div className="upload-thumbail h-450">
        <button className="button is-outline">
          <Dropzone
            className="upload-dropzone"
            onDrop={files => setThumbnail(files)}
            onDropRejected={this.onDropRejected}
            multiple
          >
            <Add /> &nbsp;Upload Thumbnail
          </Dropzone>
        </button>
      </div>
    );
  }
}

export default ThumbnailTabView;
