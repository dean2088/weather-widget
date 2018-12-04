import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import Routers from './routers';

import ApiClient from 'helpers/ApiClient';
import createStore from 'redux/create';
import './sources/style/index.scss';

const client = new ApiClient();

const store = createStore(client);

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById('root')
);