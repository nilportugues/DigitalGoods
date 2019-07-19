import Checkbox from '../../elements/checkbox';
import TextFieldWithLabel from '../../elements/TextFieldWithLabel';

const PriceLicenseTabView = ({
  changeEnableSubscription,
  changeLicensing,
  productItem,
  setPrice,
  setHDResolutionPrice
}) => (
  <div className="h-450">
    <div>
      <span className="normal-text">
        If you are uploading a video in 4K resolution, we automatically convert
        it to HD for you, and allow your customers to purchase either
        resolution. You can set a custom price for each resolution.
      </span>
      &nbsp;
    </div>
    <div className="mt-30">
      <TextFieldWithLabel
        title="Original image resolution price"
        placeholder="Video Price"
        value={productItem.priceLicense.originalResolutionPrice}
        onChange={e => setPrice(e)}
      />
    </div>

    <div className="mt-30">
      <TextFieldWithLabel
        title="HD resolution priece"
        description="- If your original video is not in 4K resolution, leave this empty."
        placeholder="HD resolution price"
        value={productItem.priceLicense.hdresolutionPrice}
        onChange={e => setHDResolutionPrice(e)}
      />
    </div>

    <div className="mt-30">
      <span className="h-label">Enable Subscription</span>&nbsp;
      <span className="normal-text">
        - Increase your sales by making this product eligible for subscription
        purchase
      </span>
      &nbsp;
      <span className="filename">Learn More</span>
      <div className="mt-10">
        <Checkbox
          checked={productItem.priceLicense.enableSubsription}
          onChange={changeEnableSubscription}
          label="Enable this product to be eligible for purchase under a subscription plan"
        />
      </div>
    </div>

    <div className="mt-30">
      <span className="h-label">Licensing</span>&nbsp;
      <span className="normal-text">
        - Select which licenses you would like to offer for this product. Learn
        more about the different licenses you would like to offer.
      </span>
      &nbsp;
      <span className="filename">Learn More</span>
      <div className="mt-10 d-flex">
        <Checkbox
          checked={
            productItem.priceLicense.licensing === 'Standard' ||
            productItem.priceLicense.licensing === 'Both'
          }
          onChange={e => changeLicensing('Standard')}
          label="Standard"
        />

        <div className="ml-100">
          <Checkbox
            checked={
              productItem.priceLicense.licensing === 'Premium' ||
              productItem.priceLicense.licensing === 'Both'
            }
            onChange={e => changeLicensing('Premium')}
            label="Premium"
          />
        </div>
      </div>
    </div>
  </div>
);

export default PriceLicenseTabView;
