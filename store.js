import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
// import persistState from 'redux-localstorage';
import reducer from './reducers';
import rootSaga from './saga';

const bindMiddleware = middleware => {
  return composeWithDevTools(applyMiddleware(...middleware));
};

let appStore = null;

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);
  appStore = store;
  return store;
}

export function getStore() {
  return appStore;
}

export default configureStore;
