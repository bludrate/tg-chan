import ACTION_TYPES from "../constants/actions";

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANNELS.FETCH_OK:
      return action.payload;
    default:
      return state;
  }
};
