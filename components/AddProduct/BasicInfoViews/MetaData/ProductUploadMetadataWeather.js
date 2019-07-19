import Checkbox from '../../../elements/checkbox';

const ProductUploadMetadataWeather = ({
  checkWeatherTypeHandler,
  checkWeatherSeasonHandler,
  checkClimateTypeHandler,
  productItem
}) => (
  <div className="mb-100">
    <div className="columns">
      <div className="column">
        <span className="h-label">Weather Type</span>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.weather.type.includes(0)}
            onChange={() => checkWeatherTypeHandler(0)}
            label="Sunny"
          />
          <Checkbox
            checked={productItem.metaData.weather.type.includes(1)}
            onChange={() => checkWeatherTypeHandler(1)}
            label="Cloudy"
          />
          <Checkbox
            checked={productItem.metaData.weather.type.includes(2)}
            onChange={() => checkWeatherTypeHandler(2)}
            label="Rainy"
          />
        </div>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.weather.type.includes(3)}
            onChange={() => checkWeatherTypeHandler(3)}
            label="Snow"
          />
          <Checkbox
            checked={productItem.metaData.weather.type.includes(4)}
            onChange={() => checkWeatherTypeHandler(4)}
            label="Fog"
          />
          <Checkbox
            checked={productItem.metaData.weather.type.includes(5)}
            onChange={() => checkWeatherTypeHandler(5)}
            label="Sormy"
          />
        </div>
        <div className="mt-30">
          <span className="h-label">Weather Season</span>
        </div>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.weather.season.includes(0)}
            onChange={() => checkWeatherSeasonHandler(0)}
            label="Fall"
          />
          <Checkbox
            checked={productItem.metaData.weather.season.includes(1)}
            onChange={() => checkWeatherSeasonHandler(1)}
            label="Spring"
          />
          <Checkbox
            checked={productItem.metaData.weather.season.includes(2)}
            onChange={() => checkWeatherSeasonHandler(2)}
            label="Summer"
          />
        </div>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.weather.season.includes(3)}
            onChange={() => checkWeatherSeasonHandler(3)}
            label="Winter"
          />
          <Checkbox
            checked={productItem.metaData.weather.season.includes(4)}
            onChange={() => checkWeatherSeasonHandler(4)}
            label="Monsoon"
          />
        </div>
      </div>

      <div className="column">
        <span className="h-label">Climate Type</span>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.weather.climate.includes(0)}
            onChange={() => checkClimateTypeHandler(0)}
            label="Hot"
          />
          <Checkbox
            checked={productItem.metaData.weather.climate.includes(1)}
            onChange={() => checkClimateTypeHandler(1)}
            label="Hold"
          />
          <Checkbox
            checked={productItem.metaData.weather.climate.includes(2)}
            onChange={() => checkClimateTypeHandler(2)}
            label="Dry"
          />
        </div>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.weather.climate.includes(3)}
            onChange={() => checkClimateTypeHandler(3)}
            label="Tropical"
          />
          <Checkbox
            checked={productItem.metaData.weather.climate.includes(4)}
            onChange={() => checkClimateTypeHandler(4)}
            label="Moderate"
          />
          <Checkbox
            checked={productItem.metaData.weather.climate.includes(5)}
            onChange={() => checkClimateTypeHandler(5)}
            label="Humid"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ProductUploadMetadataWeather;
