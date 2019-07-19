import Select from 'react-select';

const DropdownWithLabel = ({
  title,
  description,
  value,
  onChange,
  options,
  isMulti,
  isFull
}) => (
  <div>
    <label className="h-label">
      {title} <span className="normal-text">{description}</span>
    </label>
    <div className={isFull ? 'mt-15' : 'mt-15 w-275'}>
      <Select
        isMulti={isMulti}
        value={value}
        onChange={onChange}
        options={options}
      />
    </div>
  </div>
);

export default DropdownWithLabel;
