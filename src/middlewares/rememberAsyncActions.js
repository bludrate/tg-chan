import asyncActionsMonitor from '../modules/asyncActionsMonitor';

function createMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      const result = action( dispatch, getState, extraArgument );

      if ( result.then ) {
        asyncActionsMonitor.addAction( result );
      }

      return result;
    }

    return next(action);
  };
}

const rememberAsyncMiddleware = createMiddleware();
rememberAsyncMiddleware.withExtraArgument = createMiddleware;

export default rememberAsyncMiddleware;
