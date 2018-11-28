import localStorage from "../modules/localStorage";

export default store => next => action => {
  const returnValue = next( action );

  localStorage.saveState( store.getState() );

  return returnValue;
};
