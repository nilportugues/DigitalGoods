const Radio = ({ title = 'This is the default title', onClickHandler }) => (
  <div className="control" onClick={e => onClickHandler(e)}>
    <label className="radio">
      <input className="with-gap" name="group1" type="radio" />

      <span>{title}</span>
    </label>
  </div>
);

export default Radio;
