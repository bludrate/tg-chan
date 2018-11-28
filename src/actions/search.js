import ACTION_TYPES from '../constants/actions';

export default {
  changeQuery: ( query ) => ({ type: ACTION_TYPES.SEARCH.CHANGE_QUERY, payload: { query: query } })
};
