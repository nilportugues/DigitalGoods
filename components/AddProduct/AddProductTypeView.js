/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from 'react';

import {
  CameraAltOutlined,
  VideocamOutlined,
  ArrowForward,
  AudiotrackOutlined
} from '@material-ui/icons';

class AddProductTypeView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedType: 0 };
  }

  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  selecttypeHandler = e => {
    this.setState({ selectedType: e });
  };

  continueHandler = () => {
    this.props.continueHandler(this.state.selectedType);
  };

  render() {
    return (
      <div className="product-content">
        <div className="title-product">Add Product</div>
        <div className="subtitle-product">
          What type of product do you want to upload?
        </div>

        <div className="product-type columns">
          <div className="column is-one-third">
            <div
              className="product-subtype"
              onClick={() => this.selecttypeHandler(0)}
            >
              <div
                className={
                  this.state.selectedType === 0
                    ? 'btn-product-active'
                    : 'btn-product-type'
                }
              >
                <CameraAltOutlined
                  style={{
                    fontSize: '44px',
                    color: this.state.selectedType === 0 ? '#1ba076' : '#a6a6a6'
                  }}
                />
              </div>
              <div className="product-btn-labels">
                <div className="product-label-1">Stock Photo</div>
                <div className="product-label-2">PNG, JPG, TIFF, GIF</div>
              </div>
            </div>
          </div>

          <div className="column is-one-third">
            <div
              className="product-subtype"
              onClick={() => this.selecttypeHandler(1)}
            >
              <div
                className={
                  this.state.selectedType === 1
                    ? 'btn-product-active'
                    : 'btn-product-type'
                }
              >
                <VideocamOutlined
                  style={{
                    fontSize: '44px',
                    color: this.state.selectedType === 1 ? '#1ba076' : '#a6a6a6'
                  }}
                />
              </div>
              <div className="product-btn-labels">
                <div className="product-label-1">Stock Video</div>
                <div className="product-label-2">MOV, MP4, MPG, AVI</div>
              </div>
            </div>
          </div>

          <div className="column is-one-third">
            <div
              className="product-subtype"
              onClick={() => this.selecttypeHandler(2)}
            >
              <div
                className={
                  this.state.selectedType === 2
                    ? 'btn-product-active'
                    : 'btn-product-type'
                }
              >
                <AudiotrackOutlined
                  style={{
                    fontSize: '44px',
                    color: this.state.selectedType === 2 ? '#1ba076' : '#a6a6a6'
                  }}
                />
              </div>
              <div className="product-btn-labels">
                <div className="product-label-1">Audio</div>
                <div className="product-label-2">Songs, Loops, Clips</div>
              </div>
            </div>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-gray-outline p-50">
              Cancel
            </button>
          </div>
          <div className="control">
            <button
              type="submit"
              className="button is-normal-primary p-30"
              onClick={e => this.continueHandler(e)}
            >
              Continue &nbsp; <ArrowForward />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProductTypeView;
