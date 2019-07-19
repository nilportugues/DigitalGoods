const Checkbox = ({ checked, onChange, disabled, label }) => (
  <div className="React__checkbox" onClick={e => onChange(e)}>
    <input
      type="checkbox"
      className="React__checkbox--input"
      checked={checked}
      disabled={disabled}
      readOnly
    />
    <span className="React__checkbox--span" />
    &nbsp;&nbsp;{label}
  </div>
);

export default Checkbox;
