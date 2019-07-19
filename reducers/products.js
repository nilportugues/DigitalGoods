import { handleActions } from 'redux-actions';

const defaultState = {
  currentFileBeingUploadedIndex: -1, // index, so we can find it in filesToUpload[currentFileBeingUploaded] to get current file
  step: 'type',
  type: '',
  changing: false,
  removingUploadId: null,
  bundle: {
    filesToUpload: [],
    productType: '',
    bundleName: '',
    bundlePrice: 0,
    productsToUpload: [
      // {
      //   // 1
      //   filename: 'test',
      //   expanded: true,
      //   percentUploadCompleted: 0,
      //   canceled: false,
      //   uploadComplete: false,
      //   basicInfo: {
      //     title: 'tet',
      //     category: [],
      //     stockVideoUse: 'Commercial',
      //     orientation: 'Landscape'
      //   },
      //   priceLicense: {
      //     originalResolutionPrice: 0,
      //     hdresolutionPrice: 0,
      //     enableSubsription: true,
      //     licensing: 'Both'
      //   },
      //   thumbnail: 'AWSObjectIDToken',
      //   releases: [
      //     { id: 3, name: 'Bananas' },
      //     { id: 4, name: 'Mangos' },
      //     { id: 5, name: 'Lemons' },
      //     { id: 6, name: 'Apricots' }
      //   ],
      //   tags: [
      //     { id: 3, name: 'test' },
      //     { id: 4, name: 'Mangtos' },
      //     { id: 5, name: 'Lemsons' },
      //     { id: 6, name: 'Aprficots' }
      //   ],
      //   metaData: {
      //     people: {
      //       numberOfPeople: 1,
      //       gender: 0,
      //       ethnicity: [],
      //       ageRange: []
      //     },
      //     weather: {
      //       type: [],
      //       season: [],
      //       climate: []
      //     },
      //     camera: {
      //       size: [],
      //       angle: [],
      //       framing: [],
      //       movement: []
      //     }
      //   }
      // },
    ]
  }
};

export default handleActions(
  {
    RESET_PRODUCT: state => {
      return {
        ...state,
        currentFileBeingUploadedIndex: -1,
        step: 'type',
        type: '',
        changing: false,
        removingUploadId: null,
        bundle: {
          filesToUpload: [],
          productType: '',
          bundleName: '',
          bundlePrice: 0,
          productsToUpload: []
        }
      };
    },

    SET_ADD_PRODUCT_STEP: (state, { payload: { step, type } }) => {
      return {
        ...state,
        step, // type, stock, upload
        changing: false,
        type
      };
    },

    INCREASE_FILE_INDEX: state => {
      return {
        ...state,
        changing: true,
        currentFileBeingUploadedIndex: state.currentFileBeingUploadedIndex + 1
      };
    },

    REMOVE_UPLOAD_WITHINDEX: (
      state,
      { payload: { index, needDecreaseIndex } }
    ) => {
      let { bundle, currentFileBeingUploadedIndex, step } = state;
      const removingUploadId = bundle.productsToUpload[index].uploadId;
      bundle.filesToUpload.splice(index, 1);
      bundle.productsToUpload.splice(index, 1);

      if (bundle.filesToUpload.length === 0) {
        // canceled all upload. Need to reset to init state
        step = 'stock';
        currentFileBeingUploadedIndex = -1;
      }

      if (needDecreaseIndex) {
        currentFileBeingUploadedIndex -= 1;

        if (currentFileBeingUploadedIndex < -1) {
          currentFileBeingUploadedIndex = -1;
        }
      }
      return {
        ...state,
        bundle,
        step,
        currentFileBeingUploadedIndex,
        removingUploadId
      };
    },

    UPDATE_BUNDLE_BASIC_INFO: (
      state,
      { payload: { bundleName, bundlePrice } }
    ) => {
      const { bundle } = state;
      bundle.bundleName = bundleName;
      bundle.bundlePrice = bundlePrice;
      return {
        ...state,
        bundle
      };
    },

    UPLOAD_PERCENTCOMPLETED: (
      state,
      { payload: { percentCompleted, currentFileIndex, uploadId } }
    ) => {
      const { bundle } = state;

      if (
        state.removingUploadId === uploadId ||
        bundle.productsToUpload.length === 0
      ) {
        // when call abort multipart upload, percent complete action still work for some more seconds
        return {
          ...state
        };
      }

      bundle.productsToUpload[
        currentFileIndex
      ].percentUploadCompleted = percentCompleted;

      bundle.productsToUpload[currentFileIndex].uploadId = uploadId;

      return {
        ...state,
        bundle
      };
    },

    SET_BUNDLE_BASIC_INFO: (
      state,
      { payload: { productType, bundleName = '', bundlePrice, files } }
    ) => {
      const { bundle } = state;
      bundle.productType = productType;
      bundle.bundleName = bundleName;
      bundle.bundlePrice = bundlePrice;
      bundle.filesToUpload = files;

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        // console.log(files)
        bundle.productsToUpload.push({});
        bundle.productsToUpload[i].filename = file.name;
        bundle.productsToUpload[i].file = file;
        bundle.productsToUpload[i].expanded = i === 0;
        bundle.productsToUpload[i].percentUploadCompleted = 0;
        bundle.productsToUpload[i].basicInfo = {
          title: '',
          category: [],
          stockVideoUse: 'Commercial',
          orientation: 'Landscape'
        };
        bundle.productsToUpload[i].tags = [];
        bundle.productsToUpload[i].releases = [];

        bundle.productsToUpload[i].priceLicense = {
          originalResolutionPrice: 0,
          hdresolutionPrice: 0,
          enableSubsription: true,
          licensing: 'Both'
        };

        bundle.productsToUpload[i].metaData = {
          people: {
            numberOfPeople: 1,
            gender: 0,
            ethnicity: [],
            ageRange: []
          },
          weather: {
            type: [],
            season: [],
            climate: []
          },
          camera: {
            size: [],
            angle: [],
            framing: [],
            movement: []
          }
        };
      }
      return {
        ...state,
        bundle
      };
    },

    SET_PRODUCT_ITEM: (state, { payload: { index, productItem } }) => {
      const { bundle } = state;
      bundle.productsToUpload[index] = productItem;

      return {
        ...state,
        bundle,
        changing: true
      };
    }
  },
  defaultState
);
