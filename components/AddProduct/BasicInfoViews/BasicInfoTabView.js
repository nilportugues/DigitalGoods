import Radio from '../../elements/radio';
import TextFieldWithLabel from '../../elements/TextFieldWithLabel';
import DropdownWithLabel from '../../elements/DropdownWithLabel';

const options = [
  { value: 'Landscape', label: 'Landscape' },
  { value: 'Portrait', label: 'Portrait' }
];

const BasicInfoTabView = ({
  setStockVideoUse,
  productItem,
  setTitle,
  setOrientation,
  setCategory
}) => (
  <div className="h-450">
    <div className="columns">
      <div className="column">
        <div className="field">
          <TextFieldWithLabel
            title="Title"
            placeholder="Product Title"
            value={productItem.basicInfo.title}
            onChange={e => setTitle(e)}
            isFull
          />
        </div>
      </div>
      <div className="column">
        <div className="field">
          <DropdownWithLabel
            title="Category"
            description="- Choose 3 categories"
            isMulti
            value={productItem.basicInfo.category}
            onChange={setCategory}
            options={options}
            isFull
          />
        </div>
      </div>
    </div>
    <div className="mt-15">
      <span className="h-label">Stock Image Use</span>&nbsp;
      <span className="normal-text">
        - Choose whether this stock footage will be sold for commercial or
        editiorial purpose
      </span>
      &nbsp;
      <span className="filename">Learn More</span>
    </div>

    <div className="d-flex mt-15">
      <Radio
        title="Commercial"
        onClickHandler={() => setStockVideoUse('Commercial')}
        isChecked={productItem.basicInfo.stockVideoUse === 'Commercial'}
      />
      <div className="ml-100">
        <Radio
          title="Editorial"
          onClickHandler={() => setStockVideoUse('Editorial')}
          isChecked={productItem.basicInfo.stockVideoUse === 'Editorial'}
        />
      </div>
    </div>
    <div className="mt-30">
      <DropdownWithLabel
        title="Orientation"
        description="- Choose the orientation of your image"
        isMulti={false}
        value={productItem.basicInfo.orientation}
        onChange={setOrientation}
        options={options}
      />
    </div>
  </div>
);

export default BasicInfoTabView;
