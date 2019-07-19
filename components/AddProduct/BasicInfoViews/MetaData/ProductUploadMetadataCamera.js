import Checkbox from '../../../elements/checkbox';

const ProductUploadMetadataCamera = ({
  checkCameraShotsizeHandler,
  checkCameraAngleHandler,
  checkCameraShotframingHandler,
  checkCameraMovementHandler,
  productItem
}) => (
  <div className="mb-100">
    <div className="columns">
      <div className="column">
        <span className="h-label">Shot Size</span>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.camera.size.includes(0)}
            onChange={() => checkCameraShotsizeHandler(0)}
            label="Close-up"
          />
          <Checkbox
            checked={productItem.metaData.camera.size.includes(1)}
            onChange={() => checkCameraShotsizeHandler(1)}
            label="Medium"
          />
          <div className="ml-30">
            <Checkbox
              checked={productItem.metaData.camera.size.includes(2)}
              onChange={() => checkCameraShotsizeHandler(2)}
              label="Wide/Long"
            />
          </div>
        </div>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.camera.size.includes(3)}
            onChange={() => checkCameraShotsizeHandler(3)}
            label="Full"
          />
          <Checkbox
            checked={productItem.metaData.camera.size.includes(4)}
            onChange={() => checkCameraShotsizeHandler(4)}
            label="Medium Long"
          />
          <div className="ml-20">
            <Checkbox
              checked={productItem.metaData.camera.size.includes(5)}
              onChange={() => checkCameraShotsizeHandler(5)}
              label="Medium Close up"
            />
          </div>
        </div>
        <div className="mt-30">
          <span className="h-label">Camera Angle</span>
        </div>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.camera.angle.includes(0)}
            onChange={() => checkCameraAngleHandler(0)}
            label="Eye level"
          />
          <Checkbox
            checked={productItem.metaData.camera.angle.includes(1)}
            onChange={() => checkCameraAngleHandler(1)}
            label="High"
          />
          <Checkbox
            checked={productItem.metaData.camera.angle.includes(2)}
            onChange={() => checkCameraAngleHandler(2)}
            label="Low"
          />
        </div>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.camera.angle.includes(3)}
            onChange={() => checkCameraAngleHandler(3)}
            label="Dutch/Tilt"
          />
          <Checkbox
            checked={productItem.metaData.camera.angle.includes(4)}
            onChange={() => checkCameraAngleHandler(4)}
            label="Bird eye view"
          />
        </div>
      </div>

      <div className="column">
        <span className="h-label">Shot Framing</span>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.camera.framing.includes(0)}
            onChange={() => checkCameraShotframingHandler(0)}
            label="Single"
          />
          <Checkbox
            checked={productItem.metaData.camera.framing.includes(1)}
            onChange={() => checkCameraShotframingHandler(1)}
            label="Two"
          />
          <Checkbox
            checked={productItem.metaData.camera.framing.includes(2)}
            onChange={() => checkCameraShotframingHandler(2)}
            label="Three"
          />
        </div>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.camera.framing.includes(3)}
            onChange={() => checkCameraShotframingHandler(3)}
            label="Over shoulder"
          />
          <div className="ml-30">
            <Checkbox
              checked={productItem.metaData.camera.framing.includes(4)}
              onChange={() => checkCameraShotframingHandler(4)}
              label="Point of view"
            />
          </div>
        </div>
        <div className="mt-30">
          <span className="h-label">Camera Movement</span>
        </div>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.camera.movement.includes(0)}
            onChange={() => checkCameraMovementHandler(0)}
            label="Tilt level"
          />
          <Checkbox
            checked={productItem.metaData.camera.movement.includes(1)}
            onChange={() => checkCameraMovementHandler(1)}
            label="Pan"
          />
          <Checkbox
            checked={productItem.metaData.camera.movement.includes(2)}
            onChange={() => checkCameraMovementHandler(2)}
            label="Pedestal"
          />
        </div>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.camera.movement.includes(3)}
            onChange={() => checkCameraMovementHandler(3)}
            label="Zoom"
          />
          <Checkbox
            checked={productItem.metaData.camera.movement.includes(4)}
            onChange={() => checkCameraMovementHandler(4)}
            label="Dolly"
          />
          <Checkbox
            checked={productItem.metaData.camera.movement.includes(5)}
            onChange={() => checkCameraMovementHandler(5)}
            label="Truck"
          />
        </div>
        <div className="mt-10 d-flex">
          <Checkbox
            checked={productItem.metaData.camera.movement.includes(6)}
            onChange={() => checkCameraMovementHandler(6)}
            label="Hand held"
          />
          <Checkbox
            checked={productItem.metaData.camera.movement.includes(7)}
            onChange={() => checkCameraMovementHandler(7)}
            label="Gimbal"
          />
          <Checkbox
            checked={productItem.metaData.camera.movement.includes(8)}
            onChange={() => checkCameraMovementHandler(8)}
            label="Drone/Aerial"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ProductUploadMetadataCamera;
