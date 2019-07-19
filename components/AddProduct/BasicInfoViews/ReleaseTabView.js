import ReactTags from 'react-tag-autocomplete';
import { Add } from '@material-ui/icons';
import Checkbox from '../../elements/checkbox';

const ReleaseTabView = ({
  changeIncludePeople,
  handleDelete,
  productItem,
  handleAddition
}) => (
  <div className="h-450">
    <div className="">
      <span className="h-label">Releases</span>&nbsp;
      <span className="normal-text">- Add any model or property releases.</span>
      &nbsp;
      <span className="filename">Learn More</span>
      <div className="mt-10 d-flex content-between">
        <Checkbox
          checked={productItem.includePeople}
          onChange={changeIncludePeople}
          label="Video includes any recognizable people and/or places"
          allowNew
        />
        <button className="button is-outline" type="button">
          <Add /> &nbsp;Add Release
        </button>
      </div>
    </div>

    <div className="mt-10">
      <ReactTags
        tags={productItem.releases}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        placeholder=""
      />
    </div>
  </div>
);

export default ReleaseTabView;
