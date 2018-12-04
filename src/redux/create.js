import { createStore as _createStore, applyMiddleware, compose } from 'redux';
// import ReduxPromise from 'redux-promise';
import createMiddleware from './middleware/clientMiddleware';
import reducer from 'redux/modules/reducer';

// export const store = applyMiddleware(ReduxPromise)(createStore)(reducers);


export default function createStore(client, initialState) {
  const middleware = createMiddleware(client);

  const __DEVELOPMENT__ = true;

  let finalCreateStore;
  if (__DEVELOPMENT__) {
    finalCreateStore = compose(
      applyMiddleware(middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(middleware)(_createStore);
  }

  const store = finalCreateStore(reducer, initialState);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer').default);
    });
  }

  return store;
}