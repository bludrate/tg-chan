import { TELEGRAM_CDN, TELEGRAM_CDN_REPLACER, ACTION_TYPES } from '../constants';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANNELS.FETCH_OK:
      action.payload.forEach( channel => {
        channel.avatar = channel.avatar.replace(TELEGRAM_CDN, TELEGRAM_CDN_REPLACER);
      });
      return action.payload;
    default:
      return state;
  }
};
