/**
 * Action Types
 */

export const INCREMENT = 'blank/INCREMENT';
export const LOAD = 'blank/LOAD';
export const LOAD_SUCCESS = 'blank/LOAD_SUCCESS';
export const LOAD_FAIL = 'blank/LOAD_FAIL';

/**
 * Initial State
 */
export const initialState = {
  loaded: false,
  loading: false,
  result: null
};

/**
 * Reducer
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case LOAD:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: null,
        result: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

/**
 * Action
 */
export function load(params) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('http://api.openweathermap.org/data/2.5/weather', {
      params
    })
  };
}
