import ReactTags from 'react-tag-autocomplete';

const TagsTabView = ({ handleDelete, productItem, handleAddition }) => (
  <div className="h-450">
    <div className="">
      <span className="h-label">Tags</span>&nbsp;
      <span className="normal-text">
        - Add any revelant tags that you want to associalte with this clip.
      </span>
      &nbsp;
      <span className="filename">Learn More</span>
    </div>

    <div className="mt-10">
      <ReactTags
        tags={productItem.tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        allowNew
        placeholder="Enter tags here and press enter"
      />
    </div>
  </div>
);

export default TagsTabView;
