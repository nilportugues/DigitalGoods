/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from 'react';
import Progress from '../elements/progress';
import BasicInfoTabView from './BasicInfoViews/BasicInfoTabView';
import PriceLicenseTabView from './BasicInfoViews/PriceLicenseTabView';
import ThumbnailTabView from './BasicInfoViews/ThumbnailTabView';
import ReleaseTabView from './BasicInfoViews/ReleaseTabView';
import TagsTabView from './BasicInfoViews/TagsTabView';
import MetadataTabView from './BasicInfoViews/MetadataTabView';

class ProductUploadVideoBasicInfoView extends Component {
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

  setTitle = title => {
    const { productItem, index } = this.props;
    productItem.basicInfo.title = title;
    this.props.setProductWithIndex(index, productItem);
  };

  setOrientation = orientation => {
    const { productItem, index } = this.props;
    productItem.basicInfo.orientation = orientation;
    this.props.setProductWithIndex(index, productItem);
  };

  setCategory = category => {
    const { productItem, index } = this.props;
    productItem.basicInfo.category = category;
    this.props.setProductWithIndex(index, productItem);
  };

  setStockVideoUse = stockVideoUse => {
    const { productItem, index } = this.props;
    productItem.basicInfo.stockVideoUse = stockVideoUse;
    this.props.setProductWithIndex(index, productItem);
  };

  setExpaned = expanded => {
    const { productItem, index } = this.props;
    productItem.expanded = expanded;
    this.props.setProductWithIndex(index, productItem);
  };

  /**
   * Price & License
   * */

  setPrice = price => {
    const { productItem, index } = this.props;
    productItem.priceLicense.originalResolutionPrice = price;
    this.props.setProductWithIndex(index, productItem);
  };

  setHDResolutionPrice = price => {
    const { productItem, index } = this.props;
    productItem.priceLicense.hdresolutionPrice = price;
    this.props.setProductWithIndex(index, productItem);
  };

  changeEnableSubscription = () => {
    const { productItem, index } = this.props;
    productItem.priceLicense.enableSubsription = !productItem.priceLicense
      .enableSubsription;
    this.props.setProductWithIndex(index, productItem);
  };

  changeIncludePeople = () => {
    const { productItem, index } = this.props;
    productItem.includePeople = !productItem.includePeople;
    this.props.setProductWithIndex(index, productItem);
  };

  changeLicensing = type => {
    const { productItem, index } = this.props;

    if (productItem.priceLicense.licensing === 'Both') {
      if (type === 'Standard') {
        productItem.priceLicense.licensing = 'Premium';
      } else {
        productItem.priceLicense.licensing = 'Standard';
      }
    } else if (productItem.priceLicense.licensing === 'Standard') {
      if (type === 'Standard') {
        productItem.priceLicense.licensing = '';
      } else {
        productItem.priceLicense.licensing = 'Both';
      }
    } else if (productItem.priceLicense.licensing === 'Premium') {
      if (type === 'Standard') {
        productItem.priceLicense.licensing = 'Both';
      } else {
        productItem.priceLicense.licensing = '';
      }
    } else {
      productItem.priceLicense.licensing = type;
    }

    this.props.setProductWithIndex(index, productItem);
  };

  /**
   * Release
   */

  handleReleaseDelete = i => {
    const { productItem, index } = this.props;
    if (productItem.releases && productItem.releases.length > 0) {
      const tags = productItem.releases.slice(0);
      tags.splice(i, 1);
      productItem.releases = tags;
      this.props.setProductWithIndex(index, productItem);
    }
  };

  handleReleaseAddition = tag => {
    const { productItem, index } = this.props;
    const tags = [].concat(productItem.releases, tag);
    productItem.releases = tags;
    this.props.setProductWithIndex(index, productItem);
  };

  /**
   * tags
   */

  handleTagsDelete = i => {
    const { productItem, index } = this.props;
    if (productItem.tags && productItem.tags.length > 0) {
      const tags = productItem.tags.slice(0);
      tags.splice(i, 1);
      productItem.tags = tags;
      this.props.setProductWithIndex(index, productItem);
    }
  };

  handleTagsAddition = tag => {
    const { productItem, index } = this.props;
    const tags = [].concat(productItem.tags, tag);
    productItem.tags = tags;
    this.props.setProductWithIndex(index, productItem);
  };

  /**
   * metadata - people
   */

  setNumberofPeople = numberofPeople => {
    const { productItem, index } = this.props;
    productItem.metaData.people.numberOfPeople = numberofPeople;
    this.props.setProductWithIndex(index, productItem);
  };

  checkGenderHandler = gender => {
    const { productItem, index } = this.props;
    productItem.metaData.people.gender = gender;
    this.props.setProductWithIndex(index, productItem);
  };

  checkEthnicityHandler = ethnicity => {
    const { productItem, index } = this.props;
    if (productItem.metaData.people.ethnicity.includes(ethnicity)) {
      const filtered = productItem.metaData.people.ethnicity.filter(value => {
        return value !== ethnicity;
      });

      productItem.metaData.people.ethnicity = filtered;
    } else {
      productItem.metaData.people.ethnicity = [].concat(
        productItem.metaData.people.ethnicity,
        ethnicity
      );
    }

    this.props.setProductWithIndex(index, productItem);
  };

  checkAgeRangeHandler = ageRange => {
    const { productItem, index } = this.props;
    if (productItem.metaData.people.ageRange.includes(ageRange)) {
      const filtered = productItem.metaData.people.ageRange.filter(value => {
        return value !== ageRange;
      });

      productItem.metaData.people.ageRange = filtered;
    } else {
      productItem.metaData.people.ageRange = [].concat(
        productItem.metaData.people.ageRange,
        ageRange
      );
    }

    this.props.setProductWithIndex(index, productItem);
  };

  /**
   * Meta data weather
   */
  checkWeatherTypeHandler = type => {
    const { productItem, index } = this.props;
    if (productItem.metaData.weather.type.includes(type)) {
      const filtered = productItem.metaData.weather.type.filter(value => {
        return value !== type;
      });

      productItem.metaData.weather.type = filtered;
    } else {
      productItem.metaData.weather.type = [].concat(
        productItem.metaData.weather.type,
        type
      );
    }

    this.props.setProductWithIndex(index, productItem);
  };

  checkWeatherSeasonHandler = season => {
    const { productItem, index } = this.props;
    if (productItem.metaData.weather.season.includes(season)) {
      const filtered = productItem.metaData.weather.season.filter(value => {
        return value !== season;
      });

      productItem.metaData.weather.season = filtered;
    } else {
      productItem.metaData.weather.season = [].concat(
        productItem.metaData.weather.season,
        season
      );
    }

    this.props.setProductWithIndex(index, productItem);
  };

  checkClimateTypeHandler = climate => {
    const { productItem, index } = this.props;
    if (productItem.metaData.weather.climate.includes(climate)) {
      const filtered = productItem.metaData.weather.climate.filter(value => {
        return value !== climate;
      });

      productItem.metaData.weather.climate = filtered;
    } else {
      productItem.metaData.weather.climate = [].concat(
        productItem.metaData.weather.climate,
        climate
      );
    }

    this.props.setProductWithIndex(index, productItem);
  };

  checkCameraMovementHandler = movement => {
    const { productItem, index } = this.props;
    if (productItem.metaData.camera.movement.includes(movement)) {
      const filtered = productItem.metaData.camera.movement.filter(value => {
        return value !== movement;
      });

      productItem.metaData.camera.movement = filtered;
    } else {
      productItem.metaData.camera.movement = [].concat(
        productItem.metaData.camera.movement,
        movement
      );
    }

    this.props.setProductWithIndex(index, productItem);
  };

  checkCameraShotsizeHandler = size => {
    const { productItem, index } = this.props;
    if (productItem.metaData.camera.size.includes(size)) {
      const filtered = productItem.metaData.camera.size.filter(value => {
        return value !== size;
      });

      productItem.metaData.camera.size = filtered;
    } else {
      productItem.metaData.camera.size = [].concat(
        productItem.metaData.camera.size,
        size
      );
    }

    this.props.setProductWithIndex(index, productItem);
  };

  checkCameraAngleHandler = angle => {
    const { productItem, index } = this.props;
    if (productItem.metaData.camera.angle.includes(angle)) {
      const filtered = productItem.metaData.camera.angle.filter(value => {
        return value !== angle;
      });

      productItem.metaData.camera.angle = filtered;
    } else {
      productItem.metaData.camera.angle = [].concat(
        productItem.metaData.camera.angle,
        angle
      );
    }

    this.props.setProductWithIndex(index, productItem);
  };

  checkCameraShotframingHandler = framing => {
    const { productItem, index } = this.props;
    if (productItem.metaData.camera.framing.includes(framing)) {
      const filtered = productItem.metaData.camera.framing.filter(value => {
        return value !== framing;
      });

      productItem.metaData.camera.framing = filtered;
    } else {
      productItem.metaData.camera.framing = [].concat(
        productItem.metaData.camera.framing,
        framing
      );
    }

    this.props.setProductWithIndex(index, productItem);
  };

  cancelHandler = () => {
    const { productItem, index } = this.props;
    this.props.cancelUploadWithIndex(index);
  };

  render() {
    const { productItem } = this.props;

    return (
      <div className="product-content mt-15">
        <div className="border-container-no">
          <div className="p-bundlebasicinfo">
            Uploading - <span className="filename">{productItem.filename}</span>
          </div>
          <div className="p-bundlebasicinfo">
            <Progress
              progress={productItem.percentUploadCompleted}
              cancelHandler={this.cancelHandler}
            />
          </div>

          {productItem.expanded ? (
            <div className="p-bundlebasicinfo">
              <div className="tabs is-fullwidth">
                <ul>
                  <li
                    className={this.state.tabIndex === 0 ? 'is-active' : ''}
                    onClick={() => this.selectTabHandler(0)}
                  >
                    <a>Basic Info</a>
                  </li>
                  <li
                    className={this.state.tabIndex === 1 ? 'is-active' : ''}
                    onClick={() => this.selectTabHandler(1)}
                  >
                    <a>Price & License</a>
                  </li>
                  <li
                    className={this.state.tabIndex === 2 ? 'is-active' : ''}
                    onClick={() => this.selectTabHandler(2)}
                  >
                    <a>Thumbnail</a>
                  </li>
                  <li
                    className={this.state.tabIndex === 3 ? 'is-active' : ''}
                    onClick={() => this.selectTabHandler(3)}
                  >
                    <a>Release</a>
                  </li>
                  <li
                    className={this.state.tabIndex === 4 ? 'is-active' : ''}
                    onClick={() => this.selectTabHandler(4)}
                  >
                    <a>Tags</a>
                  </li>
                  <li
                    className={this.state.tabIndex === 5 ? 'is-active' : ''}
                    onClick={() => this.selectTabHandler(5)}
                  >
                    <a>Metadata</a>
                  </li>
                </ul>
              </div>

              {/* tabcontent */}
              {this.state.tabIndex === 0 ? (
                <BasicInfoTabView
                  productItem={productItem}
                  setStockVideoUse={this.setStockVideoUse}
                  setTitle={this.setTitle}
                  setOrientation={this.setOrientation}
                  setCategory={this.setCategory}
                />
              ) : (
                ''
              )}
              {this.state.tabIndex === 1 ? (
                <PriceLicenseTabView
                  productItem={productItem}
                  changeEnableSubscription={this.changeEnableSubscription}
                  changeLicensing={this.changeLicensing}
                  setPrice={this.setPrice}
                  setHDResolutionPrice={this.setHDResolutionPrice}
                />
              ) : (
                ''
              )}
              {this.state.tabIndex === 2 ? (
                <ThumbnailTabView productItem={productItem} />
              ) : (
                ''
              )}
              {this.state.tabIndex === 3 ? (
                <ReleaseTabView
                  productItem={productItem}
                  handleDelete={this.handleReleaseDelete}
                  handleAddition={this.handleReleaseAddition}
                  changeIncludePeople={this.changeIncludePeople}
                />
              ) : (
                ''
              )}
              {this.state.tabIndex === 4 ? (
                <TagsTabView
                  productItem={productItem}
                  handleDelete={this.handleTagsDelete}
                  handleAddition={this.handleTagsAddition}
                />
              ) : (
                ''
              )}
              {this.state.tabIndex === 5 ? (
                <MetadataTabView
                  productItem={productItem}
                  setNumberofPeople={this.setNumberofPeople}
                  checkGenderHandler={this.checkGenderHandler}
                  checkEthnicityHandler={this.checkEthnicityHandler}
                  checkAgeRangeHandler={this.checkAgeRangeHandler}
                  checkWeatherTypeHandler={this.checkWeatherTypeHandler}
                  checkWeatherSeasonHandler={this.checkWeatherSeasonHandler}
                  checkClimateTypeHandler={this.checkClimateTypeHandler}
                  checkCameraShotsizeHandler={this.checkCameraShotsizeHandler}
                  checkCameraAngleHandler={this.checkCameraAngleHandler}
                  checkCameraShotframingHandler={
                    this.checkCameraShotframingHandler
                  }
                  checkCameraMovementHandler={this.checkCameraMovementHandler}
                />
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
          <hr />
          {productItem.expanded ? (
            <div className="d-flex p-bundleend">
              <div className="d-flex content-start w-100">
                <button className="button is-mediumn" type="button">
                  Previous
                </button>
                <button className="button is-mediumn ml-10" type="button">
                  Next
                </button>
              </div>
              <div className="d-flex content-end">
                <button className="button is-mediumn" type="button">
                  Save
                </button>
                <button
                  className="button ml-10 is-mediumn-primary"
                  type="button"
                >
                  Save & Submit
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex p-bundleend">
              <button
                className="button is-mediumn"
                type="button"
                onClick={() => this.setExpaned(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProductUploadVideoBasicInfoView;
