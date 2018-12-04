export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => {  // eslint-disable-line arrow-body-style
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;

      // Actions with API call has REQUEST, SUCCESS & FAILURE
      const [REQUEST, SUCCESS, FAILURE] = types;

      // Ignore null value
      if (REQUEST) {
        next({ ...rest, type: REQUEST });
      }

      const actionPromise = promise(client);
      actionPromise.then(
        function(resp) {
          const result = resp.body;
          if (SUCCESS && (result !== null || resp.statusCode === 204)) { // Or Item Deleted
            next({ ...rest, result, type: SUCCESS });
          } else if (SUCCESS && result === null) {  // API has failed
            next({ ...rest, error: { message: 'API response is null' }, type: FAILURE });
          }
        },
        function(error) {
          if (FAILURE) {
            next({ ...rest, error, type: FAILURE });
          }
        }
      ).catch((error) => {
        // Log TypeError
        if (error.name === 'TypeError') {
          console.error(error);  // eslint-disable-line
        } else {
          // All other errors pass to reducer as FAILURE
          next({ ...rest, error, type: FAILURE });
        }
      });

      return actionPromise;
    };
  };
}
