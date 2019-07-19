const TextFieldWithLabel = ({
  title,
  description,
  placeholder,
  value,
  onChange,
  isFull
}) => (
  <div>
    <span className="h-label">{title}</span>&nbsp;
    <span className="normal-text">{description}</span>
    <div className="control mt-15">
      <input
        className={isFull ? 'input' : 'input normal-input'}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  </div>
);

export default TextFieldWithLabel;
