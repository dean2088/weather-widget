import { combineReducers } from 'redux';

import me from './me';

const rootReducer = combineReducers({
  //state: (state = {})=>state
  me: me
});

export default rootReducer;
