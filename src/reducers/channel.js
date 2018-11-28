import ACTION_TYPES from "../constants/actions";

const defaultState = {
  showChannelInfo: false,
  data: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANNEL.FETCH_OK:
      return {...state, data: action.payload}
    case ACTION_TYPES.CHANNEL.LOGO_CLICK:
      return {...state, showChannelInfo: true};
    case ACTION_TYPES.CHANNEL.BACK_CLICK:
      return {...state, showChannelInfo: false};
    default:
      return state;
  }
};;
