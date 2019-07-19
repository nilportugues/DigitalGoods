/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from 'react';
import { Add } from '@material-ui/icons';
import Dropzone from 'react-dropzone';
import Radio from '../elements/radio';

class AddStockFootageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: null,
      bundleName: '',
      bundlePrice: '',
      multiStep: 0
    };
  }

  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  selectedTypeHandler = e => {
    this.setState({ selectedType: e });

    if (this.state.selectedType === 'single') {
      this.setState({ multiStep: 0 });
    } else {
      this.setState({ multiStep: 1 });
    }
  };

  uploadHandler = files => {
    if (files[0] instanceof Blob) {
      this.props.uploadHandler(
        this.state.selectedType,
        this.state.bundleName,
        this.state.bundlePrice,
        files
      );
    }
  };

  onDropRejected = () => {};

  render() {
    return (
      <div className="product-content">
        <div className="title-header">
          <div className="product-title">Add new stock footage</div>
          <div className="product-subtitle">Upload your stock footage</div>
        </div>

        <div className="border-container">
          <div className="footage-type mt-30">
            <Radio
              title="Single/Multiple videos"
              onClickHandler={() => this.selectedTypeHandler('single')}
              isChecked={this.state.selectedType === 'single'}
            />
            <div className="multiple-desc ml-30">
              Upload a single or multiple videos
            </div>
          </div>
          <div className="footage-type">
            <Radio
              title="Bundle - Multiple videos"
              onClickHandler={() => this.selectedTypeHandler('multiple')}
              isChecked={this.state.selectedType === 'multiple'}
            />
            <div className="multiple-desc">
              <ul>
                <li>
                  Group together multiple videos to sell as part of a package.
                </li>
                <li>
                  For example, you may have 4 different shots of the same scene,
                  with different camera angles,
                  <br />
                  and shot size variations (wide, medium, close up).
                </li>
                <li>
                  You may price these individually and also set a price for the
                  whole package
                </li>
                <li>
                  A customer can buy the entire set of videos in this package
                  for the price you set, or they can purchase it individually
                </li>
              </ul>

              {this.state.multiStep !== 0 ? (
                <div>
                  <div className="bundlename">
                    <span className="label">Bundle Name</span>
                    <div className="sublabel">
                      - Enter a name for this series, so you can edit and update
                      it later with other images
                    </div>
                  </div>
                  <div className="bundleinput">
                    <input
                      type="text"
                      placeholder="Bundle Name"
                      className="input is-large"
                      value={this.state.bundleName}
                      onChange={e =>
                        this.setState({ bundleName: e.target.value })
                      }
                    />
                  </div>
                  <div className="bundlename">
                    <span className="label">Bundle Price</span>
                    <div className="ml-20 sublabel ">
                      - Enter the price you would like to set for a user to
                      purchase all of the videos in this package. We recommend
                      making this price competitive and discounted so users can
                      purchase it.
                    </div>
                  </div>
                  <div className="bundleinput">
                    <input
                      placeholder="Bundle Price"
                      className="input is-large"
                      type="number"
                      min="0"
                      step="0.01"
                      value={this.state.bundlePrice}
                      onChange={e =>
                        this.setState({ bundlePrice: e.target.value })
                      }
                    />
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className="border-container">
          <div className="control my-30">
            <button
              type="submit"
              className="button is-normal-primary p-30"
              onClick={e => this.uploadHandler(e)}
              disabled={this.state.selectedType === null}
            >
              <Dropzone
                className="upload-dropzone"
                onDrop={files => this.uploadHandler(files)}
                onDropRejected={this.onDropRejected}
                multiple
              >
                <Add /> &nbsp;Upload
              </Dropzone>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddStockFootageView;
