/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from 'react';
import ProductUploadMetadataPeople from './MetaData/ProductUploadMetadataPeople';
import ProductUploadMetadataWeather from './MetaData/ProductUploadMetadataWeather';
import ProductUploadMetadataCamera from './MetaData/ProductUploadMetadataCamera';

class MetadataTabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };
  }

  static getInitialProps() {
    const isServer = typeof window === 'undefined';
    return { isServer };
  }

  selectTabHandler = index => {
    this.setState({ tabIndex: index });
  };

  render() {
    const {
      productItem,
      setNumberofPeople,
      checkGenderHandler,
      checkEthnicityHandler,
      checkAgeRangeHandler,
      checkWeatherTypeHandler,
      checkWeatherSeasonHandler,
      checkClimateTypeHandler,
      checkCameraShotsizeHandler,
      checkCameraAngleHandler,
      checkCameraShotframingHandler,
      checkCameraMovementHandler
    } = this.props;

    return (
      <div className="h-450">
        <div className="tabs tabs-second is-fullwidth">
          <ul>
            <li
              className={
                this.state.tabIndex === 0 ? 'is-active bg-transgreen' : ''
              }
              onClick={() => this.selectTabHandler(0)}
            >
              <a className="bg-primary">People</a>
            </li>
            <li
              className={
                this.state.tabIndex === 1 ? 'is-active bg-transgreen' : ''
              }
              onClick={() => this.selectTabHandler(1)}
            >
              <a>Weather</a>
            </li>
            <li
              className={
                this.state.tabIndex === 2 ? 'is-active bg-transgreen' : ''
              }
              onClick={() => this.selectTabHandler(2)}
            >
              <a>Camera</a>
            </li>
          </ul>
        </div>

        {/* tabcontent */}
        {this.state.tabIndex === 0 ? (
          <ProductUploadMetadataPeople
            productItem={productItem}
            setNumberofPeople={setNumberofPeople}
            checkGenderHandler={checkGenderHandler}
            checkEthnicityHandler={checkEthnicityHandler}
            checkAgeRangeHandler={checkAgeRangeHandler}
          />
        ) : (
          ''
        )}
        {this.state.tabIndex === 1 ? (
          <ProductUploadMetadataWeather
            productItem={productItem}
            checkWeatherTypeHandler={checkWeatherTypeHandler}
            checkWeatherSeasonHandler={checkWeatherSeasonHandler}
            checkClimateTypeHandler={checkClimateTypeHandler}
          />
        ) : (
          ''
        )}
        {this.state.tabIndex === 2 ? (
          <ProductUploadMetadataCamera
            productItem={productItem}
            checkCameraShotsizeHandler={checkCameraShotsizeHandler}
            checkCameraAngleHandler={checkCameraAngleHandler}
            checkCameraShotframingHandler={checkCameraShotframingHandler}
            checkCameraMovementHandler={checkCameraMovementHandler}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default MetadataTabView;
