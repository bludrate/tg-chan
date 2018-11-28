import ACTION_TYPES from "../constants/actions";

const defaultState = {
  query: 'default search'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SEARCH.CHANGE_QUERY:
      return {...state, query: action.payload.query };
    default:
      return state;
  }
};;
