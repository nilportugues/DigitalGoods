import Select from 'react-select';
import Checkbox from '../../../elements/checkbox';
import DropdownWithLabel from '../../../elements/DropdownWithLabel';

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' }
];

const ProductUploadMetadataPeople = ({
  setNumberofPeople,
  checkGenderHandler,
  checkEthnicityHandler,
  checkAgeRangeHandler,
  productItem
}) => (
  <div className="mb-100">
    <div className="columns">
      <div className="column">
        <DropdownWithLabel
          title="Number of people"
          value={productItem.metaData.people.numberOfPeople}
          onChange={setNumberofPeople}
          options={options}
        />
        <div className="mt-60 d-flex">
          <span className="h-label">Gender(s)</span>
        </div>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.people.gender === 1}
            onChange={() => checkGenderHandler(1)}
            label="Male"
          />
          <Checkbox
            checked={productItem.metaData.people.gender === 2}
            onChange={() => checkGenderHandler(2)}
            label="Female"
          />
          <Checkbox
            checked={productItem.metaData.people.gender === 3}
            onChange={() => checkGenderHandler(3)}
            label="Other"
          />
        </div>
      </div>

      <div className="column">
        <span className="h-label">Ethnicity</span>
        <div className="mt-10 d-flex content-between">
          <Checkbox
            checked={productItem.metaData.people.ethnicity.includes(0)}
            onChange={() => checkEthnicityHandler(0)}
            label="Asian"
          />
          <Checkbox
            checked={productItem.metaData.people.ethnicity.includes(1)}
            onChange={() => checkEthnicityHandler(1)}
            label="African"
          />
          <Checkbox
            checked={productItem.metaData.people.ethnicity.includes(2)}
            onChange={() => checkEthnicityHandler(2)}
            label="Caucasian"
          />
        </div>
        <div className="mt-10 d-flex content-between">
          <Checkbox
            checked={productItem.metaData.people.ethnicity.includes(3)}
            onChange={() => checkEthnicityHandler(3)}
            label="Indian"
          />
          <Checkbox
            checked={productItem.metaData.people.ethnicity.includes(4)}
            onChange={() => checkEthnicityHandler(4)}
            label="Latino"
          />
          <Checkbox
            checked={productItem.metaData.people.ethnicity.includes(5)}
            onChange={() => checkEthnicityHandler(5)}
            label="Multi-ethnic"
          />
        </div>
        <div className="mt-30">
          <span className="h-label">Age range(s)</span>
        </div>
        <div className="mt-10 d-flex content-between">
          <Checkbox
            checked={productItem.metaData.people.ageRange.includes(0)}
            onChange={() => checkAgeRangeHandler(0)}
            label="Infant"
          />
          <Checkbox
            checked={productItem.metaData.people.ageRange.includes(1)}
            onChange={() => checkAgeRangeHandler(1)}
            label="Children"
          />
          <Checkbox
            checked={productItem.metaData.people.ageRange.includes(2)}
            onChange={() => checkAgeRangeHandler(2)}
            label="Teens"
          />
        </div>
        <div className="mt-10 d-flex content-between">
          <Checkbox
            checked={productItem.metaData.people.ageRange.includes(3)}
            onChange={() => checkAgeRangeHandler(3)}
            label="Young adult"
          />
          <Checkbox
            checked={productItem.metaData.people.ageRange.includes(4)}
            onChange={() => checkAgeRangeHandler(4)}
            label="Adult"
          />
          <Checkbox
            checked={productItem.metaData.people.ageRange.includes(5)}
            onChange={() => checkAgeRangeHandler(5)}
            label="Senior"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ProductUploadMetadataPeople;
