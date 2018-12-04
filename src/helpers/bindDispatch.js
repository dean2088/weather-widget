import { bindActionCreators } from 'redux';

export function bindActions(actionCreators) {
  return dispatch => {  // eslint-disable-line
    return bindActionCreators(actionCreators, dispatch);
  };
}